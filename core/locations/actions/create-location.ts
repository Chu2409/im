'use server'

import { handleAction } from '@/core/shared/utils/action-handler'
import prisma from '@/core/shared/utils/prisma'
import { Location } from '@prisma/client'

interface ICreateLocation extends Omit<Location, 'id' | 'active'> {}

export const createLocation = async (data: ICreateLocation) => {
  const createLocation = async () =>
    await prisma.location.create({
      data,
    })

  return await handleAction(createLocation, '[CREATE_LOCATION]')
}
