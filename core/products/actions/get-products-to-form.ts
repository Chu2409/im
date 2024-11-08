'use server'

import prisma from '@/core/shared/utils/prisma'
import { handleAction } from '@/core/shared/utils/actions-handlers'

export const getProductsToForm = async (search: string) => {
  const getProductsToForm = async () =>
    await prisma.product.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      take: 20,
    })

  return await handleAction(getProductsToForm, '[GET_PRODUCTS_TO_FORM]')
}
