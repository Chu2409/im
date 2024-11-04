'use server'

import { getPaginationParams } from '@/core/shared/utils/pagination'
import prisma from '@/core/shared/utils/prisma'
import { Prisma } from '@prisma/client'
import { IProviderPaginationParams } from '../types/pagination'
import { handlePaginatedAction } from '@/core/shared/utils/actions-handlers'
import {
  getStatusWhere,
  isValidField,
  isValidSortOrder,
} from '@/core/shared/utils/action-validators'

export const getProviders = async (params: IProviderPaginationParams) => {
  const { skip, page, size } = getPaginationParams(params)

  const where: Prisma.ProviderWhereInput = {
    ...(params.search
      ? { name: { contains: params.search, mode: 'insensitive' } }
      : {}),
    ...getStatusWhere(params.status),
  }

  const orderBy: Prisma.ProviderOrderByWithRelationInput =
    isValidField(params.sort, prisma.provider.fields) &&
    isValidSortOrder(params.order)
      ? {
          [params.sort as string]: params.order!.toLowerCase(),
        }
      : {}

  const getProviders = async () => {
    const total = await prisma.provider.count({ where })

    const providers = await prisma.provider.findMany({
      where,
      skip,
      take: size,
      orderBy,
    })

    const totalPages = Math.ceil(total / size)

    return {
      data: providers,
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

  return await handlePaginatedAction(getProviders, '[GET_PROVIDERS]')
}
