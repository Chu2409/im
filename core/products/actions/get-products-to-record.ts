'use server'

import prisma from '@/lib/prisma'
import { CATEGORIES } from '../data/categories'

export const getProductsToRecord = async () => {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          in: [CATEGORIES.AGENTS.name, CATEGORIES.INPUTS.name],
        },
      },
    })

    return products
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_PRODUCTS_TO_RECORD]', error.message)
    return []
  }
}
