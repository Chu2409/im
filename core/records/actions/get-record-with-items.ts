'use server'

import prisma from '@/core/shared/utils/prisma'
import { IRecordWithItems } from '../types'

export const getRecordWithItems = async (
  id: number,
): Promise<IRecordWithItems | null> => {
  try {
    const record = await prisma.record.findUnique({
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

    return record
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_RECORDS]', error.message)
    return null
  }
}
