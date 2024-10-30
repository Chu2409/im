'use server'

import prisma from '@/core/shared/utils/prisma'
import { CATEGORIES } from '../../products/data/categories'
import { handleAction } from '@/core/shared/utils/action-handler'

export const getLotProductsToRecord = async () => {
  const getLotProductsToRecord = async () =>
    await prisma.lotLocation.findMany({
      where: {
        lot: {
          product: {
            category: {
              in: [CATEGORIES.AGENTS.name, CATEGORIES.INPUTS.name],
            },
            active: true,
          },
        },
        stock: { gt: 0 },
      },
      include: {
        lot: {
          include: {
            product: true,
          },
        },
        location: true,
      },
    })

  return await handleAction(
    getLotProductsToRecord,
    '[GET_LOT_PRODUCTS_TO_RECORD]',
  )
}
