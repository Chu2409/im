'use server'

import prisma from '@/core/shared/utils/prisma'
import { Product } from '@prisma/client'

interface IUpdateProduct extends Partial<Omit<Product, 'id' | 'active'>> {}

export const updateProduct = async (id: number, data: IUpdateProduct) => {
  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    })

    return !!product
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[UPDATE_PRODUCT]', error.message)
    return false
  }
}
