'use server'

import { handleAction } from '@/core/shared/utils/action-handler'
import prisma from '@/core/shared/utils/prisma'
import { Product } from '@prisma/client'

export interface ICreateProduct extends Omit<Product, 'id' | 'active'> {}

export const createProduct = async (data: ICreateProduct) => {
  const action = async () => {
    return await prisma.product.create({
      data: {
        ...data,
      },
    })
  }

  return await handleAction(action, '[CREATE_PRODUCT]')
}
