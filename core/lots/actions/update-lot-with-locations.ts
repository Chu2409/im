'use server'

import prisma from '@/lib/prisma'
import { IUpsertLotLocationBulkProps } from '../types'

interface BulkItem {
  locationId: number
  quantity: number
}

export const updateLotWithLocations = async (
  lotId: number,
  data: IUpsertLotLocationBulkProps,
) => {
  try {
    const toAdd: BulkItem[] = []
    const toEdit: BulkItem[] = []
    const toDelete: BulkItem[] = []

    data.lotLocations.forEach((lotLocation) => {
      if (!lotLocation.isSaved) {
        toAdd.push({
          locationId: lotLocation.location.id,
          quantity: lotLocation.quantity.value,
        })
      } else if (lotLocation.toEdit && !lotLocation.toDelete) {
        toEdit.push({
          locationId: lotLocation.location.id,
          quantity: lotLocation.quantity.value,
        })
      } else if (lotLocation.toDelete) {
        toDelete.push({
          locationId: lotLocation.location.id,
          quantity: lotLocation.quantity.value,
        })
      }
    })

    return await prisma.$transaction(async (prisma) => {
      if (toAdd.length > 0) {
        await prisma.lotLocation.createMany({
          data: toAdd.map((lotLocation) => ({
            locationId: lotLocation.locationId,
            quantity: lotLocation.quantity,
            lotId,
          })),
        })
      }

      if (toEdit.length > 0) {
        for (const lotLocation of toEdit) {
          await prisma.lotLocation.updateMany({
            where: {
              lotId,
              locationId: lotLocation.locationId,
            },
            data: {
              quantity: lotLocation.quantity,
            },
          })
        }
      }

      if (toDelete.length > 0) {
        for (const lotLocation of toDelete) {
          await prisma.lotLocation.deleteMany({
            where: {
              locationId: lotLocation.locationId,
              lotId,
            },
          })
        }
      }

      await prisma.lot.update({
        where: { id: lotId },
        data: {
          quantityPurchased: data.quantityPurchased,
          usesPerUnit: data.usesPerUnit,
          expirationDate: data.expirationDate,
          price: data.price,
          orderDate: data.orderDate,
          receptionDate: data.receptionDate,
        },
      })

      return lotId
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[UPDATE_LOT_WITH_LOCATIONS]', error.message)
    return null
  }
}
