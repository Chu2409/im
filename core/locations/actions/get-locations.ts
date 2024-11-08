'use server'

import { handlePaginatedAction } from '@/core/shared/utils/actions-handlers'
import prisma from '@/core/shared/utils/prisma'
import { ILocationPaginationParams } from '../types/pagination'
import { getPaginationParams } from '@/core/shared/utils/pagination'
import { Prisma } from '@prisma/client'
import {
  getConstantsLabels,
  getStatusWhere,
  isValidField,
  isValidSortOrder,
} from '@/core/shared/utils/action-validators'
import { getLaboratoryConstById } from '../data/labobratories'

export const getLocations = async (params: ILocationPaginationParams) => {
  const { skip, page, size } = getPaginationParams(params)

  const laboratories = getConstantsLabels(
    getLaboratoryConstById,
    params.laboratory,
  )

  const where: Prisma.LocationWhereInput = {
    ...(params.search
      ? { name: { contains: params.search, mode: 'insensitive' } }
      : {}),
    ...getStatusWhere(params.status),
    ...(laboratories
      ? {
          laboratory: {
            ...(typeof laboratories === 'string'
              ? { contains: laboratories }
              : { in: laboratories }),
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
