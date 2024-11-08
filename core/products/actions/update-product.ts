'use server'

import { ACTIONS } from '@/core/shared/data/actions'
import { TABLES } from '@/core/shared/data/tables'
import { handleAction } from '@/core/shared/utils/actions-handlers'
import prisma from '@/core/shared/utils/prisma'
import { Product } from '@prisma/client'

interface IUpdateProduct extends Partial<Omit<Product, 'id' | 'active'>> {}

export const updateProduct = async (id: number, data: IUpdateProduct) => {
  const updateProduct = async () =>
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    })

  return await handleAction(updateProduct, '[UPDATE_PRODUCT]', {
    entityId: id,
    table: TABLES.PRODUCTS,
    action: ACTIONS.UPDATE,
    content: data,
  })
}
