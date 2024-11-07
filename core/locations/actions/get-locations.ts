'use server'

import { handlePaginatedAction } from '@/core/shared/utils/actions-handlers'
import prisma from '@/core/shared/utils/prisma'
import { ILocationPaginationParams } from '../types/pagination'
import { getPaginationParams } from '@/core/shared/utils/pagination'
import { Prisma } from '@prisma/client'
import {
  getStatusWhere,
  isValidField,
  isValidSortOrder,
} from '@/core/shared/utils/action-validators'
import { getLaboratoryById } from '../data/labobratories'

export const getLocations = async (params: ILocationPaginationParams) => {
  const { skip, page, size } = getPaginationParams(params)

  const where: Prisma.LocationWhereInput = {
    ...(params.search
      ? { name: { contains: params.search, mode: 'insensitive' } }
      : {}),
    ...getStatusWhere(params.status),
    ...(params.laboratory
      ? {
          laboratory: {
            contains: getLaboratoryById(Number(params.laboratory))?.name,
            mode: 'insensitive',
          },
        }
      : {}),
  }

  const orderBy: Prisma.LocationOrderByWithRelationInput =
    isValidField(params.sort, prisma.location.fields) &&
    isValidSortOrder(params.order)
      ? {
          [params.sort as string]: params.order!.toLowerCase(),
        }
      : {}

  const getLocations = async () => {
    const total = await prisma.location.count({ where })

    const locations = await prisma.location.findMany({
      where,
      skip,
      take: size,
      orderBy,
    })

    const totalPages = Math.ceil(total / size)

    return {
      data: locations,
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

  return await handlePaginatedAction(getLocations, '[GET_LOCATIONS]')
}
