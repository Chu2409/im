'use server'

import prisma from '@/lib/prisma'
import { IProductWithProviders } from '../types'

export const getProductsWithProviders = async (): Promise<
  IProductWithProviders[]
> => {
  try {
    const productsWithProviders = await prisma.product.findMany({
      include: {
        productsProviders: {
          include: {
            provider: true,
          },
        },
      },
    })

    return productsWithProviders
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_PRODUCTS_WITH_PROVIDERS]', error.message)
    return []
  }
}
