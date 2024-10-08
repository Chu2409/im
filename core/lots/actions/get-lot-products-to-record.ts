'use server'

import prisma from '@/lib/prisma'
import { CATEGORIES } from '../../products/data/categories'
import { IFullLotLocation } from '../types'

export const getLotProductsToRecord = async (): Promise<IFullLotLocation[]> => {
  try {
    const lots = await prisma.lotLocation.findMany({
      where: {
        lot: {
          product: {
            category: {
              in: [CATEGORIES.AGENTS.name, CATEGORIES.INPUTS.name],
            },
            active: true,
          },
        },
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

    return lots
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_LOT_PRODUCTS_TO_RECORD]', error.message)
    return []
  }
}
