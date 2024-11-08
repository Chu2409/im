'use server'

import {
  getStatusWhere,
  isValidField,
  isValidSortOrder,
} from '@/core/shared/utils/action-validators'
import { handlePaginatedAction } from '@/core/shared/utils/actions-handlers'
import { getPaginationParams } from '@/core/shared/utils/pagination'
import prisma from '@/core/shared/utils/prisma'
import { Prisma } from '@prisma/client'
import { IProductPaginationParams } from '../types/pagination'
import { getCategoryConstById } from '../data/categories'

export const getProducts = async (params: IProductPaginationParams) => {
  const { skip, page, size } = getPaginationParams(params)

  const where: Prisma.ProductWhereInput = {
    ...(params.search
      ? { name: { contains: params.search, mode: 'insensitive' } }
      : {}),
    ...getStatusWhere(params.status),
    ...(params.category
      ? {
          category: {
            in:
              typeof params.category === 'string'
                ? [getCategoryConstById(Number(params.category))?.label].filter(
                    (cat) => cat != null,
                  )
                : params.category
                    .map(
                      (category) =>
                        getCategoryConstById(Number(category))?.label,
                    )
                    .filter((cat) => cat != null),
            mode: 'insensitive',
          },
        }
      : {}),
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    isValidField(params.sort, prisma.product.fields) &&
    isValidSortOrder(params.order)
      ? {
          [params.sort as string]: params.order!.toLowerCase(),
        }
      : {}

  const getProducts = async () => {
    const total = await prisma.product.count({ where })

    const products = await prisma.product.findMany({
      where,
      skip,
      take: size,
      orderBy,
    })

    const totalPages = Math.ceil(total / size)

    return {
      data: products,
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

  return await handlePaginatedAction(getProducts, '[GET_PRODUCTS]')
}
