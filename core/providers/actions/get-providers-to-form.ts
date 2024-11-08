'use server'

import prisma from '@/core/shared/utils/prisma'
import { handleAction } from '@/core/shared/utils/actions-handlers'

export const getProvidersToForm = async (search: string) => {
  const getProvidersToForm = async () =>
    await prisma.provider.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      take: 20,
    })

  return await handleAction(getProvidersToForm, '[GET_PROVIDERS_TO_FORM]')
}
