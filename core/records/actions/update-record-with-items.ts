'use server'

import { IRowItem } from '@/core/items/components/form-data-table'
import prisma from '@/lib/prisma'

export interface CreateProductBulkProps {
  start: Date
  end: Date
  items: IRowItem[]
}

interface BulkItem {
  productId: number
  quantity: number
}

export const updateRecordWithItems = async (
  recordId: number,
  data: CreateProductBulkProps,
) => {
  try {
    const toAdd: BulkItem[] = []
    const toEdit: BulkItem[] = []
    const toDelete: BulkItem[] = []

    data.items.forEach((item) => {
      if (!item.isSaved) {
        toAdd.push({
          productId: item.product.id,
          quantity: item.quantity.value,
        })
      } else if (item.toEdit) {
        toEdit.push({
          productId: item.product.id,
          quantity: item.quantity.value,
        })
      } else if (item.toDelete) {
        toDelete.push({
          productId: item.product.id,
          quantity: item.quantity.value,
        })
      }
    })

    return await prisma.$transaction(async (prisma) => {
      if (toAdd.length > 0)
        await prisma.item.createMany({
          data: toAdd.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            recordId,
          })),
        })

      if (toEdit.length > 0)
        toEdit.forEach(async (item) => {
          await prisma.item.updateMany({
            where: {
              recordId,
              productId: item.productId,
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
              productId: item.productId,
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
