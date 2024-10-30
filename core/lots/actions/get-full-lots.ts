'use server'

import prisma from '@/core/shared/utils/prisma'
import { handleAction } from '@/core/shared/utils/action-handler'

export const getFullLots = async () => {
  const getFullLots = async () =>
    await prisma.lot.findMany({
      include: {
        product: true,
        provider: true,
        lotLocations: {
          include: {
            location: true,
          },
        },
      },
    })

  return await handleAction(getFullLots, '[GET_FULL_LOTS]')
}
