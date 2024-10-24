'use server'

import prisma from '@/lib/prisma'
import { IFullAlert } from '../types'

export const getAlerts = async (): Promise<IFullAlert[]> => {
  try {
    const alerts = await prisma.alert.findMany({
      where: {
        resolved: false,
      },
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

    return alerts
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_ALERTS]', error.message)
    return []
  }
}
