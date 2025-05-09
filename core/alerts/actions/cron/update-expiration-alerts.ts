import prisma from '@/core/shared/utils/prisma'
import { TYPES } from '../../data/types'
import { calculateSeverity, getDaysDifference } from '../../utils'

export const updateExpirationAlerts = async () => {
  const today = new Date()

  const activeExpirationAlerts = await prisma.alert.findMany({
    where: {
      type: TYPES.EXPIRATION.label,
      resolved: false,
      lotLocation: {
        lot: {
          expirationDate: {
            not: null,
          },
        },
      },
    },
    include: {
      lotLocation: {
        include: {
          lot: {
            select: {
              expirationDate: true,
            },
          },
        },
      },
    },
  })

  const updatedAlerts = await Promise.all(
    activeExpirationAlerts.map((alert) => {
      const daysToExp = getDaysDifference(
        alert.lotLocation.lot.expirationDate!,
        today,
      )
      const newSeverity = calculateSeverity(TYPES.EXPIRATION, daysToExp)

      if (newSeverity.label !== alert.severity) {
        return prisma.alert.update({
          where: { id: alert.id },
          data: { severity: newSeverity.label },
        })
      }

      return null
    }),
  )

  return updatedAlerts.filter((alert) => alert != null)
}
