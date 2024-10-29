'use server'

import prisma from '@/core/shared/utils/prisma'
import { IRecordWithItems } from '../types'

export const getRecordsWithItems = async (): Promise<IRecordWithItems[]> => {
  try {
    const records = await prisma.record.findMany({
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

    return records
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_RECORDS_WITH_ITEMS]', error.message)
    return []
  }
}
