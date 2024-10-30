'use server'

import prisma from '@/core/shared/utils/prisma'
import { IUpsertLotLocationBulkProps } from '../types'
import { handleAction } from '@/core/shared/utils/action-handler'

interface BulkItem {
  locationId: number
  stock: number
}

export const updateLotWithLocations = async (
  id: number,
  data: IUpsertLotLocationBulkProps,
) => {
  const updateLotWithLocations = async () => {
    const toAdd: BulkItem[] = []
    const toEdit: BulkItem[] = []
    const toDelete: BulkItem[] = []

    data.lotLocations.forEach((lotLocation) => {
      if (!lotLocation.isSaved) {
        toAdd.push({
          locationId: lotLocation.location.id,
          stock: lotLocation.quantity.value,
        })
      } else if (lotLocation.toEdit && !lotLocation.toDelete) {
        toEdit.push({
          locationId: lotLocation.location.id,
          stock: lotLocation.quantity.value,
        })
      } else if (lotLocation.toDelete) {
        toDelete.push({
          locationId: lotLocation.location.id,
          stock: lotLocation.quantity.value,
        })
      }
    })

    return await prisma.$transaction(async (prisma) => {
      const lot = await prisma.lot.update({
        where: { id },
        data: {
          quantityPurchased: data.quantityPurchased,
          usesPerUnit: data.usesPerUnit,
          expirationDate: data.expirationDate,
          price: data.price,
          orderDate: data.orderDate,
          receptionDate: data.receptionDate,
        },
      })

      if (toAdd.length > 0) {
        await prisma.lotLocation.createMany({
          data: toAdd.map((lotLocation) => ({
            locationId: lotLocation.locationId,
            stock: lotLocation.stock * lot.usesPerUnit,
            lotId: id,
          })),
        })
      }

      if (toEdit.length > 0) {
        for (const lotLocation of toEdit) {
          await prisma.lotLocation.updateMany({
            where: {
              lotId: id,
              locationId: lotLocation.locationId,
            },
            data: {
              stock: lotLocation.stock * lot.usesPerUnit,
            },
          })
        }
      }

      if (toDelete.length > 0) {
        for (const lotLocation of toDelete) {
          await prisma.lotLocation.deleteMany({
            where: {
              locationId: lotLocation.locationId,
              lotId: id,
            },
          })
        }
      }

      return lot
    })
  }

  return await handleAction(
    updateLotWithLocations,
    '[UPDATE_LOT_WITH_LOCATIONS]',
  )
}
