'use server'

import prisma from '@/core/shared/utils/prisma'
import { handleAction } from '@/core/shared/utils/actions-handlers'

export const getLocationsToForm = async (search: string) => {
  const getLocationsToForm = async () =>
    await prisma.location.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            laboratory: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            code: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      take: 20,
    })

  return await handleAction(getLocationsToForm, '[GET_LOCATIONS_TO_FORM]')
}
