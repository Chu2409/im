import prisma from '@/core/shared/utils/prisma'
import { EXP_DAYS_LIMITS } from '../../data/limits'
import { addDays, calculateSeverity, getDaysDifference } from '../../utils'
import { TYPES } from '../../data/types'

export const checkExpirations = async () => {
  const today = new Date()
  const ninetyDaysFromNow = addDays(today, EXP_DAYS_LIMITS.MAX)

  const lotLocationsToAlert = await prisma.lotLocation.findMany({
    where: {
      lot: {
        expirationDate: {
          not: null,
          lte: ninetyDaysFromNow,
          gt: today,
        },
      },
      NOT: {
        alerts: {
          some: {
            type: TYPES.EXPIRATION.name,
          },
        },
      },
    },
    select: {
      id: true,
      lot: {
        select: {
          expirationDate: true,
        },
      },
    },
  })

  const alerts = await Promise.all(
    lotLocationsToAlert.map(({ id, lot }) => {
      const daysToExp = getDaysDifference(lot.expirationDate!, today)
      const severity = calculateSeverity(TYPES.EXPIRATION, daysToExp)

      return prisma.alert.create({
        data: {
          type: TYPES.EXPIRATION.name,
          lotLocationId: id,
          severity: severity.name,
        },
      })
    }),
  )

  return alerts
}
