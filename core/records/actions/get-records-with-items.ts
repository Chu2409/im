'use server'

import prisma from '@/lib/prisma'
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
    })

    return records
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_RECORDS_WITH_ITEMS]', error.message)
    return []
  }
}
