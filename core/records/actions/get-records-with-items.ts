'use server'

import prisma from '@/core/shared/utils/prisma'
import { handleAction } from '@/core/shared/utils/actions-handlers'

export const getRecordsWithItems = async () => {
  const getRecordsWithItems = async () =>
    await prisma.record.findMany({
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
      orderBy: {
        start: 'desc',
      },
    })

  return await handleAction(getRecordsWithItems, '[GET_RECORDS_WITH_ITEMS]')
}
