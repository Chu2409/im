'use server'

import prisma from '@/lib/prisma'
import { IUpsertProductBulkProps } from '../types'

interface BulkItem {
  lotLocationId: number
  quantity: number
}

export const updateRecordWithItems = async (
  recordId: number,
  data: IUpsertProductBulkProps,
) => {
  try {
    const toAdd: BulkItem[] = []
    const toEdit: BulkItem[] = []
    const toDelete: BulkItem[] = []

    data.items.forEach((item) => {
      if (!item.isSaved) {
        toAdd.push({
          lotLocationId: item.lotLocation.id,
          quantity: item.quantity.value,
        })
      } else if (item.toEdit) {
        toEdit.push({
          lotLocationId: item.lotLocation.id,
          quantity: item.quantity.value,
        })
      } else if (item.toDelete) {
        toDelete.push({
          lotLocationId: item.lotLocation.id,
          quantity: item.quantity.value,
        })
      }
    })

    return await prisma.$transaction(async (prisma) => {
      if (toAdd.length > 0)
        await prisma.item.createMany({
          data: toAdd.map((item) => ({
            lotLocationId: item.lotLocationId,
            quantity: item.quantity,
            recordId,
          })),
        })

      if (toEdit.length > 0)
        toEdit.forEach(async (item) => {
          await prisma.item.updateMany({
            where: {
              recordId,
              lotLocationId: item.lotLocationId,
            },
            data: {
              quantity: item.quantity,
            },
          })
        })

      if (toDelete.length > 0)
        toDelete.forEach(async (item) => {
          await prisma.item.deleteMany({
            where: {
              lotLocationId: item.lotLocationId,
              recordId,
            },
          })
        })

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
