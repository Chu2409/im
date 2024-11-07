import prisma from '@/core/shared/utils/prisma'
import { TYPES } from '../../data/types'
import { RESTOCK_LIMITS } from '../../data/limits'
import { calculateSeverity } from '../../utils'

export const updateStockAlerts = async () => {
  const activeStockAlerts = await prisma.alert.findMany({
    where: {
      type: TYPES.RESTOCK.name,
      resolved: false,
    },
    include: {
      lotLocation: {
        select: {
          id: true,
          stock: true,
        },
      },
    },
  })

  const updatedAlerts = await Promise.all(
    activeStockAlerts.map((alert) => {
      const currentStock = alert.lotLocation.stock

      if (currentStock > RESTOCK_LIMITS.MAX) {
        return prisma.alert.delete({
          where: { id: alert.id },
        })
      }

      const newSeverity = calculateSeverity(TYPES.RESTOCK, currentStock)

      if (newSeverity.name !== alert.severity) {
        return prisma.alert.update({
          where: { id: alert.id },
          data: { severity: newSeverity.name },
        })
      }

      return null
    }),
  )

  return updatedAlerts.filter((alert) => alert != null)
}
