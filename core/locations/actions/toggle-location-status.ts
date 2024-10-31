'use server'

import { ACTIONS } from '@/core/shared/data/actions'
import { TABLES } from '@/core/shared/data/tables'
import { handleAction } from '@/core/shared/utils/action-handler'
import prisma from '@/core/shared/utils/prisma'

export const toggleLocationStatus = async (id: number, status: boolean) => {
  const toggleLocationStatus = async () =>
    !!(await prisma.location.update({
      where: {
        id,
      },
      data: {
        active: status,
      },
    }))

  return await handleAction(toggleLocationStatus, '[TOGGLE_LOCATION_STATUS]', {
    entityId: id,
    table: TABLES.LOCATIONS,
    action: ACTIONS.STATUS,
    content: { active: status },
  })
}
