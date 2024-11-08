'use server'

import prisma from '@/core/shared/utils/prisma'
import { CATEGORIES } from '../../products/data/categories'
import { handleAction } from '@/core/shared/utils/actions-handlers'

export const getLotProductsToRecord = async (search: string) => {
  const getLotProductsToRecord = async () =>
    await prisma.lotLocation.findMany({
      where: {
        lot: {
          product: {
            category: {
              in: [CATEGORIES.AGENTS.label, CATEGORIES.INPUTS.label],
            },
            active: true,
          },
        },
        OR: [
          {
            lot: {
              product: {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            },
          },
          {
            location: {
              laboratory: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        ],
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
      take: 20,
    })

  return await handleAction(
    getLotProductsToRecord,
    '[GET_LOT_PRODUCTS_TO_RECORD]',
  )
}
