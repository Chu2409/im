'use server'

import prisma from '@/lib/prisma'
import { IProductWithProviders } from '../types'

export const getProductsWithProviders = async (
  includeInactive?: boolean,
): Promise<IProductWithProviders[]> => {
  try {
    if (includeInactive) {
      return await prisma.product.findMany({
        include: {
          productsProviders: {
            include: {
              provider: true,
            },
          },
        },
        orderBy: {
          active: 'desc',
        },
      })
    } else {
      return await prisma.product.findMany({
        include: {
          productsProviders: {
            include: {
              provider: true,
            },
          },
        },
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
    console.log('[GET_PRODUCTS_WITH_PROVIDERS]', error.message)
    return []
  }
}
