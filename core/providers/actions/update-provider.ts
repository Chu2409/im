'use server'

import { ACTIONS } from '@/core/shared/data/actions'
import { TABLES } from '@/core/shared/data/tables'
import { handleAction } from '@/core/shared/utils/actions-handlers'
import prisma from '@/core/shared/utils/prisma'
import { Provider } from '@prisma/client'

interface IUpdateProvider extends Partial<Omit<Provider, 'id' | 'active'>> {}

export const updateProvider = async (id: number, data: IUpdateProvider) => {
  const updateProvider = async () =>
    await prisma.provider.update({
      where: {
        id,
      },
      data,
    })

  return await handleAction(updateProvider, '[UPDATE_PROVIDER]', {
    entityId: id,
    table: TABLES.PROVIDERS,
    action: ACTIONS.UPDATE,
    content: data,
  })
}
