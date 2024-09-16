'use server'

import prisma from '@/lib/prisma'
import { Location } from '@prisma/client'

export const getLocations = async (): Promise<Location[]> => {
  try {
    const locations = prisma.location.findMany({
      orderBy: {
        laboratory: 'asc',
      },
    })

    return locations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_LOCATIONS]', error.message)
    return []
  }
}
