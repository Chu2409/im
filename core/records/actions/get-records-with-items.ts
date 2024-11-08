'use server'

import prisma from '@/core/shared/utils/prisma'
import { handlePaginatedAction } from '@/core/shared/utils/actions-handlers'
import { IRecordPaginationParams } from '../types/pagination'
import { getPaginationParams } from '@/core/shared/utils/pagination'
import { Prisma } from '@prisma/client'
import {
  isValidField,
  isValidSortOrder,
} from '@/core/shared/utils/action-validators'

export const getRecordsWithItems = async (params: IRecordPaginationParams) => {
  const { skip, page, size } = getPaginationParams(params)

  const orderBy: Prisma.RecordOrderByWithRelationInput =
    isValidField(params.sort, prisma.record.fields) &&
    isValidSortOrder(params.order)
      ? {
          [params.sort as string]: params.order!.toLowerCase(),
        }
      : {}

  const getRecordsWithItems = async () => {
    const total = await prisma.record.count()

    const records = await prisma.record.findMany({
      include: {
        items: {
          include: {
            lotLocation: {
              include: {
                lot: {
                  include: {
                    product: true,
                  },
                },
                location: true,
              },
            },
          },
        },
      },
      skip,
      take: size,
      orderBy,
    })

    const totalPages = Math.ceil(total / size)

    return {
      data: records,
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

  return await handlePaginatedAction(
    getRecordsWithItems,
    '[GET_RECORDS_WITH_ITEMS]',
  )
}
