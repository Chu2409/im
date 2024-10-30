'use server'

import prisma from '@/core/shared/utils/prisma'
import { handleAction } from '@/core/shared/utils/action-handler'

export const getRecordWithItems = async (id: number) => {
  const getRecordWithItems = async () =>
    await prisma.record.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            lotLocation: {
              include: {
                lot: {
                  include: {
                    product: true,
                  },
                },
                location: true,
              },
            },
          },
        },
      },
    })

  return await handleAction(getRecordWithItems, '[GET_RECORD_WITH_ITEMS]')
}
