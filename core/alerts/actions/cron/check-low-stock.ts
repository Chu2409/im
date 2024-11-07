import prisma from '@/core/shared/utils/prisma'
import { RESTOCK_LIMITS } from '../../data/limits'
import { TYPES } from '../../data/types'
import { calculateSeverity } from '../../utils'

export const checkLowStock = async () => {
  const lowStockProducts = await prisma.lotLocation.findMany({
    where: {
      stock: {
        lte: RESTOCK_LIMITS.MAX,
      },
      NOT: {
        alerts: {
          some: {
            type: TYPES.RESTOCK.name,
          },
        },
      },
    },
    select: {
      id: true,
      stock: true,
    },
  })

  const alerts = await Promise.all(
    lowStockProducts.map(({ id, stock }) => {
      const severity = calculateSeverity(TYPES.RESTOCK, stock)

      return prisma.alert.create({
        data: {
          type: TYPES.RESTOCK.name,
          lotLocationId: id,
          severity: severity.name,
        },
      })
    }),
  )

  return alerts
}
