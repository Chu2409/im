'use server'

import prisma from '@/core/shared/utils/prisma'

export const getProviders = async (includeInactive?: boolean) => {
  try {
    if (includeInactive) {
      return await prisma.provider.findMany({
        orderBy: {
          active: 'desc',
        },
      })
    } else {
      return await prisma.provider.findMany({
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
    console.log('[GET_PROVIDERS]', error.message)
    return []
  }
}
