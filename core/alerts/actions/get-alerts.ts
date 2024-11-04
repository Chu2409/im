'use server'

import prisma from '@/core/shared/utils/prisma'
import { handleAction } from '@/core/shared/utils/actions-handlers'

export const getAlerts = async () => {
  const getAlerts = async () =>
    await prisma.alert.findMany({
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

  return await handleAction(getAlerts, '[GET_ALERTS]')
}
