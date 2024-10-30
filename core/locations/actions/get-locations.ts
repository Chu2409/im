'use server'

import { handleAction } from '@/core/shared/utils/action-handler'
import prisma from '@/core/shared/utils/prisma'

export const getLocations = async (includeInactive?: boolean) => {
  const getLocations = async () => {
    if (includeInactive) {
      return await prisma.location.findMany({
        orderBy: {
          active: 'desc',
        },
      })
    } else {
      return await prisma.location.findMany({
        where: {
          active: true,
        },
        orderBy: {
          id: 'desc',
        },
      })
    }
  }

  return await handleAction(getLocations, '[GET_LOCATIONS]')
}
