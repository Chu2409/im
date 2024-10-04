'use server'

import prisma from '@/lib/prisma'

export const getLocations = async (includeInactive?: boolean) => {
  try {
    if (includeInactive) {
      return await prisma.location.findMany({
        orderBy: {
          active: 'desc',
        },
      })
    } else {
      return await prisma.location.findMany({
        where: {
          active: true,
        },
        orderBy: {
          id: 'desc',
        },
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_LOCATIONS]', error.message)
    return []
  }
}
