'use server'

import prisma from '@/core/shared/utils/prisma'
import { IUpsertProductBulkProps } from '../types'
import { handleAction } from '@/core/shared/utils/action-handler'

interface BulkItem {
  lotLocationId: number
  stock: number
}

interface ToEditItem extends BulkItem {
  oldQuantity: number
}

export const updateRecordWithItems = async (
  id: number,
  data: IUpsertProductBulkProps,
) => {
  const updateRecordWithItems = async () => {
    const toAdd: BulkItem[] = []
    const toEdit: ToEditItem[] = []
    const toDelete: BulkItem[] = []

    data.items.forEach((item) => {
      if (!item.isSaved) {
        toAdd.push({
          lotLocationId: item.lotLocation.id,
          stock: item.quantity.value,
        })
      } else if (item.toEdit.value && !item.toDelete) {
        toEdit.push({
          lotLocationId: item.lotLocation.id,
          stock: item.quantity.value,
          oldQuantity: item.toEdit.oldQuantity!,
        })
      } else if (item.toDelete) {
        toDelete.push({
          lotLocationId: item.lotLocation.id,
          stock: item.toEdit.oldQuantity,
        })
      }
    })

    return await prisma.$transaction(async (prisma) => {
      if (toAdd.length > 0) {
        await prisma.item.createMany({
          data: toAdd.map((item) => ({
            lotLocationId: item.lotLocationId,
            quantity: item.stock,
            recordId: id,
          })),
        })

        for (const item of toAdd) {
          await prisma.lotLocation.update({
            where: {
              id: item.lotLocationId,
            },
            data: {
              stock: {
                decrement: item.stock,
              },
            },
          })
        }
      }

      if (toEdit.length > 0) {
        for (const item of toEdit) {
          await prisma.item.updateMany({
            where: {
              recordId: id,
              lotLocationId: item.lotLocationId,
            },
            data: {
              quantity: item.stock,
            },
          })

          if (item.oldQuantity > item.stock) {
            const diff = item.oldQuantity - item.stock

            await prisma.lotLocation.update({
              where: {
                id: item.lotLocationId,
              },
              data: {
                stock: {
                  increment: diff,
                },
              },
            })
          } else {
            const diff = item.stock - item.oldQuantity

            await prisma.lotLocation.update({
              where: {
                id: item.lotLocationId,
              },
              data: {
                stock: {
                  decrement: diff,
                },
              },
            })
          }
        }
      }

      if (toDelete.length > 0) {
        for (const item of toDelete) {
          await prisma.item.deleteMany({
            where: {
              lotLocationId: item.lotLocationId,
              recordId: id,
            },
          })

          await prisma.lotLocation.update({
            where: {
              id: item.lotLocationId,
            },
            data: {
              stock: { increment: item.stock },
            },
          })
        }
      }

      const record = await prisma.record.update({
        where: { id },
        data: {
          start: data.start,
          end: data.end,
        },
      })

      return record
    })
  }

  return await handleAction(updateRecordWithItems, '[UPDATE_RECORD_WITH_ITEMS]')
}
