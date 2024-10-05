'use server'

import prisma from '@/lib/prisma'
import { Product } from '@prisma/client'

interface ICreateProduct extends Omit<Product, 'id' | 'active'> {}

export const createProduct = async (data: ICreateProduct) => {
  try {
    const product = await prisma.product.create({
      data: {
        ...data,
      },
    })

    return !!product
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[CREATE_PRODUCT]', error.message)
    return false
  }
}
