'use server'

import prisma from '@/core/shared/utils/prisma'
import { IUpsertProductBulkProps } from '../types'
import { handleAction } from '@/core/shared/utils/action-handler'
import { ACTIONS } from '@/core/shared/data/actions'
import { TABLES } from '@/core/shared/data/tables'

export const createRecordWithItems = async (data: IUpsertProductBulkProps) => {
  const createRecordWithItems = async () => {
    const recordBulk = await prisma.record.create({
      data: {
        start: data.start,
        end: data.end,
        items: {
          create: data.items.map((item) => ({
            lotLocationId: item.lotLocation.id,
            quantity: item.quantity.value,
          })),
        },
      },
    })

    for (const item of data.items) {
      await prisma.lotLocation.update({
        where: {
          id: item.lotLocation.id,
        },
        data: {
          stock: { decrement: item.quantity.value },
        },
      })
    }

    return recordBulk
  }

  return await handleAction(
    createRecordWithItems,
    '[CREATE_RECORD_WITH_ITEMS]',
    {
      action: ACTIONS.CREATE,
      table: TABLES.RECORDS,
      content: data,
    },
  )
}
