'use server'

import { ACTIONS } from '@/core/shared/data/actions'
import { TABLES } from '@/core/shared/data/tables'
import { handleAction } from '@/core/shared/utils/action-handler'
import prisma from '@/core/shared/utils/prisma'

export const toggleProviderStatus = async (id: number, status: boolean) => {
  const toggleProviderStatus = async () =>
    !!(await prisma.provider.update({
      where: {
        id,
      },
      data: {
        active: status,
      },
    }))

  return await handleAction(toggleProviderStatus, '[TOGGLE_PROVIDER_STATUS]', {
    entityId: id,
    table: TABLES.PROVIDERS,
    action: ACTIONS.STATUS,
    content: { active: status },
  })
}
