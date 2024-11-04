'use server'

import { ACTIONS } from '@/core/shared/data/actions'
import { TABLES } from '@/core/shared/data/tables'
import { handleAction } from '@/core/shared/utils/actions-handlers'
import prisma from '@/core/shared/utils/prisma'
import { Provider } from '@prisma/client'

interface ICreateProvider extends Omit<Provider, 'id' | 'active'> {}

export const createProvider = async (data: ICreateProvider) => {
  const createProvider = async () =>
    await prisma.provider.create({
      data,
    })

  return await handleAction(createProvider, '[CREATE_PROVIDER]', {
    action: ACTIONS.CREATE,
    table: TABLES.PROVIDERS,
    content: data,
  })
}
