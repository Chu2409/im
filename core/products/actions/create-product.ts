'use server'

import { handleAction } from '@/core/shared/utils/action-handler'
import prisma from '@/core/shared/utils/prisma'
import { Product } from '@prisma/client'

interface ICreateProduct extends Omit<Product, 'id' | 'active'> {}

export const createProduct = async (data: ICreateProduct) => {
  const createProduct = async () =>
    await prisma.product.create({
      data: {
        ...data,
      },
    })

  return await handleAction(createProduct, '[CREATE_PRODUCT]')
}
