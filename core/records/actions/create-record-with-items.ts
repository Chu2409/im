'use server'

import prisma from '@/lib/prisma'
import { IUpsertProductBulkProps } from '../types'

export const createRecordWithItems = async (data: IUpsertProductBulkProps) => {
  try {
    const recordBulk = await prisma.record.create({
      data: {
        start: data.start,
        end: data.end,
        items: {
          create: data.items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity.value,
          })),
        },
      },
    })

    return recordBulk.id
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[CREATE_RECORD_WITH_ITEMS]', error.message)
    return null
  }
}
