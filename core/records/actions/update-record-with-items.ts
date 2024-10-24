'use server'

import prisma from '@/lib/prisma'
import { IUpsertProductBulkProps } from '../types'

interface BulkItem {
  lotLocationId: number
  stock: number
}

interface ToEditItem extends BulkItem {
  oldQuantity: number
}

export const updateRecordWithItems = async (
  recordId: number,
  data: IUpsertProductBulkProps,
) => {
  try {
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
            recordId,
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
              recordId,
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
              recordId,
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

      await prisma.record.update({
        where: { id: recordId },
        data: {
          start: data.start,
          end: data.end,
        },
      })

      return recordId
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[UPDATE_RECORD_WITH_ITEMS]', error.message)
    return null
  }
}
