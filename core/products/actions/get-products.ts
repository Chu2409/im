'use server'

import { handleAction } from '@/core/shared/utils/actions-handlers'
import prisma from '@/core/shared/utils/prisma'

export const getProducts = async (includeInactive?: boolean) => {
  const getProducts = async () => {
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
  }

  return await handleAction(getProducts, '[GET_PRODUCTS]')
}
