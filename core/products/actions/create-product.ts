'use server'

import { ACTIONS } from '@/core/shared/data/actions'
import { TABLES } from '@/core/shared/data/tables'
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

  return await handleAction(createProduct, '[CREATE_PRODUCT]', {
    action: ACTIONS.CREATE,
    table: TABLES.PRODUCTS,
    content: data,
  })
}
