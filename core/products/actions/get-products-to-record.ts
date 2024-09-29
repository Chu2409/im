'use server'

import prisma from '@/lib/prisma'

export const getProductsToRecord = async () => {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          in: ['Reactivos', 'Insumos'],
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
