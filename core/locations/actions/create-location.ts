'use server'

import { ACTIONS } from '@/core/shared/data/actions'
import { TABLES } from '@/core/shared/data/tables'
import { handleAction } from '@/core/shared/utils/actions-handlers'
import prisma from '@/core/shared/utils/prisma'
import { Location } from '@prisma/client'

interface ICreateLocation extends Omit<Location, 'id' | 'active'> {}

export const createLocation = async (data: ICreateLocation) => {
  const createLocation = async () =>
    await prisma.location.create({
      data,
    })

  return await handleAction(createLocation, '[CREATE_LOCATION]', {
    action: ACTIONS.CREATE,
    table: TABLES.LOCATIONS,
    content: data,
  })
}
