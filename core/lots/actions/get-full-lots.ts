'use server'

import prisma from '@/core/shared/utils/prisma'
import { handlePaginatedAction } from '@/core/shared/utils/actions-handlers'
import { IInventoryPaginationParams } from '../types/pagination'
import { getPaginationParams } from '@/core/shared/utils/pagination'
import {
  getConstantsNames,
  isValidField,
  isValidSortOrder,
} from '@/core/shared/utils/action-validators'
import { getCategoryById } from '@/core/products/data/categories'
import { Prisma } from '@prisma/client'

export const getFullLots = async (params: IInventoryPaginationParams) => {
  const { skip, page, size } = getPaginationParams(params)

  const categories = getConstantsNames(getCategoryById, params.category)

  const where: Prisma.LotWhereInput = {
    ...(params.search
      ? {
          product: {
            name: { contains: params.search, mode: 'insensitive' },
          },
        }
      : {}),
    ...(categories
      ? {
          product: {
            category: {
              ...(typeof categories === 'string'
                ? { contains: categories }
                : { in: categories }),
              mode: 'insensitive',
            },
          },
        }
      : {}),
  }

  const orderBy: Prisma.LotOrderByWithRelationInput =
    isValidField(params.sort, prisma.lot.fields) &&
    isValidSortOrder(params.order)
      ? {
          [params.sort as string]: params.order!.toLowerCase(),
        }
      : {}

  const getFullLots = async () => {
    const total = await prisma.lot.count({ where })

    const lots = await prisma.lot.findMany({
      where,
      skip,
      take: size,
      orderBy,
      include: {
        product: true,
        provider: true,
        lotLocations: {
          include: {
            location: true,
          },
        },
      },
    })

    const totalPages = Math.ceil(total / size)

    return {
      data: lots,
      metadata: {
        total,
        size,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    }
  }

  return await handlePaginatedAction(getFullLots, '[GET_FULL_LOTS]')
}
