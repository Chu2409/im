'use server'

import { ACTIONS } from '@/core/shared/data/actions'
import { TABLES } from '@/core/shared/data/tables'
import { handleAction } from '@/core/shared/utils/actions-handlers'
import prisma from '@/core/shared/utils/prisma'
import { Location } from '@prisma/client'

interface IUpdateLocation extends Partial<Omit<Location, 'id' | 'active'>> {}

export const updateLocation = async (id: number, data: IUpdateLocation) => {
  const updateLocation = async () =>
    await prisma.location.update({
      where: {
        id,
      },
      data,
    })

  return await handleAction(updateLocation, '[UPDATE_LOCATION]', {
    entityId: id,
    table: TABLES.LOCATIONS,
    action: ACTIONS.UPDATE,
    content: data,
  })
}
