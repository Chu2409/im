'use server'

import prisma from '@/lib/prisma'
import { IUpsertProductBulkProps } from '../types'

interface BulkItem {
  lotLocationId: number
  quantity: number
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
          quantity: item.quantity.value,
        })
      } else if (item.toEdit.value && !item.toDelete) {
        toEdit.push({
          lotLocationId: item.lotLocation.id,
          quantity: item.quantity.value,
          oldQuantity: item.toEdit.oldQuantity!,
        })
      } else if (item.toDelete) {
        toDelete.push({
          lotLocationId: item.lotLocation.id,
          quantity: item.toEdit.oldQuantity,
        })
      }
    })

    return await prisma.$transaction(async (prisma) => {
      if (toAdd.length > 0) {
        await prisma.item.createMany({
          data: toAdd.map((item) => ({
            lotLocationId: item.lotLocationId,
            quantity: item.quantity,
            recordId,
          })),
        })

        for (const item of toAdd) {
          await prisma.lotLocation.update({
            where: {
              id: item.lotLocationId,
            },
            data: {
              quantity: {
                decrement: item.quantity,
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
              quantity: item.quantity,
            },
          })

          if (item.oldQuantity > item.quantity) {
            const diff = item.oldQuantity - item.quantity

            await prisma.lotLocation.update({
              where: {
                id: item.lotLocationId,
              },
              data: {
                quantity: {
                  increment: diff,
                },
              },
            })
          } else {
            const diff = item.quantity - item.oldQuantity

            await prisma.lotLocation.update({
              where: {
                id: item.lotLocationId,
              },
              data: {
                quantity: {
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
              quantity: { increment: item.quantity },
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
