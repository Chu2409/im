'use server'

import prisma from '@/core/shared/utils/prisma'
import { handleAction } from '@/core/shared/utils/actions-handlers'
import { IAlertPaginationParams } from '../types/pagination'
import { getPaginationParams } from '@/core/shared/utils/pagination'
import { Prisma } from '@prisma/client'
import {
  getConstantsNames,
  getResolvedWhere,
  isValidField,
  isValidSortOrder,
} from '@/core/shared/utils/action-validators'
import { getCategoryById } from '@/core/products/data/categories'
import { getSeverityById } from '../data/severities'
import { getTypeById } from '../data/types'

export const getAlerts = async (params: IAlertPaginationParams) => {
  const { skip, page, size } = getPaginationParams(params)

  const categories = getConstantsNames(getCategoryById, params.category)
  const severities = getConstantsNames(getSeverityById, params.severity)
  const types = getConstantsNames(getTypeById, params.type)

  const where: Prisma.AlertWhereInput = {
    ...(params.search
      ? {
          lotLocation: {
            lot: {
              product: {
                name: { contains: params.search, mode: 'insensitive' },
              },
            },
          },
        }
      : {}),
    ...(categories
      ? {
          lotLocation: {
            lot: {
              product: {
                category: {
                  ...(typeof categories === 'string'
                    ? { contains: categories }
                    : { in: categories }),
                  mode: 'insensitive',
                },
              },
            },
          },
        }
      : {}),
    ...(severities
      ? {
          severity: {
            ...(typeof severities === 'string'
              ? { contains: severities }
              : { in: severities }),
            mode: 'insensitive',
          },
        }
      : {}),
    ...(types
      ? {
          type: {
            ...(typeof types === 'string'
              ? { contains: types }
              : { in: types }),
            mode: 'insensitive',
          },
        }
      : {}),
    ...getResolvedWhere(params.status),
  }

  const orderBy: Prisma.AlertOrderByWithRelationInput =
    isValidField(params.sort, prisma.alert.fields) &&
    isValidSortOrder(params.order)
      ? {
          [params.sort as string]: params.order!.toLowerCase(),
        }
      : {}

  const getAlerts = async () => {
    const total = await prisma.alert.count({ where })

    const alerts = await prisma.alert.findMany({
      where,
      skip,
      take: size,
      orderBy,
      include: {
        lotLocation: {
          include: {
            location: true,
            lot: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    })

    const totalPages = Math.ceil(total / size)

    return {
      data: alerts,
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

  return await handleAction(getAlerts, '[GET_ALERTS]')
}
