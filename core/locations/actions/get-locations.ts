'use server'

import prisma from '@/lib/prisma'

export const getLocations = async () => {
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
