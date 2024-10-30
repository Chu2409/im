'use server'

import prisma from '@/core/shared/utils/prisma'
import { IUpsertLotLocationBulkProps } from '../types'
import { handleAction } from '@/core/shared/utils/action-handler'

export const createLotWithLocations = async (
  data: IUpsertLotLocationBulkProps,
) => {
  const createLotWithLocations = async () =>
    await prisma.lot.create({
      data: {
        ...data,
        lotLocations: {
          create: data.lotLocations.map((lotLocation) => ({
            locationId: lotLocation.location.id,
            stock: lotLocation.quantity.value * data.usesPerUnit,
          })),
        },
      },
    })

  return await handleAction(
    createLotWithLocations,
    '[CREATE_LOT_WITH_LOCATIONS]',
  )
}
