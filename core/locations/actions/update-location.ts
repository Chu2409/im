'use server'

import { handleAction } from '@/core/shared/utils/action-handler'
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

  return await handleAction(updateLocation, '[UPDATE_LOCATION]')
}
