'use server'

import prisma from '@/lib/prisma'
import { IUpsertLotLocationBulkProps } from '../types'

export const createLotWithLocations = async (
  data: IUpsertLotLocationBulkProps,
) => {
  try {
    const lotBulk = await prisma.lot.create({
      data: {
        quantityPurchased: data.quantityPurchased,
        usesPerUnit: data.usesPerUnit,
        expirationDate: data.expirationDate,
        price: data.price,
        orderDate: data.orderDate,
        receptionDate: data.receptionDate,
        productId: data.productId,
        providerId: data.providerId,
        lotLocations: {
          create: data.lotLocations.map((lotLocation) => ({
            locationId: lotLocation.location.id,
            stock: lotLocation.quantity.value,
          })),
        },
      },
    })

    return lotBulk.id
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[CREATE_LOT_WITH_LOCATIONS]', error.message)
    return null
  }
}
