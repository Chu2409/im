'use server'

import { handleAction } from '@/core/shared/utils/action-handler'
import {
  getPaginationParams,
  isValidField,
  isValidSortOrder,
} from '@/core/shared/utils/pagination'
import prisma from '@/core/shared/utils/prisma'
import { Prisma } from '@prisma/client'
import { IProviderPaginationParams } from '../types'

export const getProviders = async (params: IProviderPaginationParams) => {
  const { skip, page, limit } = getPaginationParams(params)

  const where: Prisma.ProviderWhereInput = {
    ...(params.search
      ? { name: { contains: params.search, mode: 'insensitive' } }
      : {}),
    ...(params.active ? { active: params.active === 'true' } : {}),
  }

  const orderBy: Prisma.ProviderOrderByWithRelationInput =
    isValidField(params.sort, prisma.provider.fields) &&
    isValidSortOrder(params.order)
      ? {
          [params.sort as string]: params.order.toLowerCase(),
        }
      : {}

  const getProviders = async () => {
    const total = await prisma.provider.count({ where })

    const providers = await prisma.provider.findMany({
      where,
      skip,
      take: limit,
      orderBy,
    })

    const totalPages = Math.ceil(total / limit)

    return {
      data: providers,
      metadata: {
        total,
        limit,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    }
  }

  return await handleAction(getProviders, '[GET_PROVIDERS]')
}
