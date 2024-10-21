'use server'

import prisma from '@/lib/prisma'
import { IFullLot } from '../types'

export const getFullLots = async (): Promise<IFullLot[]> => {
  try {
    const lots = await prisma.lot.findMany({
      include: {
        product: true,
        provider: true,
        lotLocations: {
          include: {
            location: true,
          },
        },
      },
    })

    return lots
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_FULL_LOTS]', error.message)
    return []
  }
}
