'use server'

import { handleAction } from '@/core/shared/utils/action-handler'
import prisma from '@/core/shared/utils/prisma'

export const getProviders = async (includeInactive?: boolean) => {
  const getProviders = async () => {
    if (includeInactive) {
      return await prisma.provider.findMany({
        orderBy: {
          active: 'desc',
        },
      })
    } else {
      return await prisma.provider.findMany({
        where: {
          active: true,
        },
        orderBy: {
          id: 'desc',
        },
      })
    }
  }

  return await handleAction(getProviders, '[GET_PROVIDERS]')
}
