'use server'

import prisma from '@/core/shared/utils/prisma'

export const getProducts = async (includeInactive?: boolean) => {
  try {
    if (includeInactive) {
      return await prisma.product.findMany({
        orderBy: {
          active: 'desc',
        },
      })
    } else {
      return await prisma.product.findMany({
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
    console.log('[GET_PRODUCTS]', error.message)
    return []
  }
}
