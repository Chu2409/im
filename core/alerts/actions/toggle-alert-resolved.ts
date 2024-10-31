'use server'

import { ACTIONS } from '@/core/shared/data/actions'
import { TABLES } from '@/core/shared/data/tables'
import { handleAction } from '@/core/shared/utils/action-handler'
import prisma from '@/core/shared/utils/prisma'

export const toggleAlertResolved = async (id: number, resolved: boolean) => {
  const toggleAlertResolved = async () =>
    !!(await prisma.alert.update({
      where: {
        id,
      },
      data: {
        resolved,
      },
    }))

  return await handleAction(toggleAlertResolved, '[TOGGLE_ALERT_RESOLVED]', {
    entityId: id,
    table: TABLES.LOCATIONS,
    action: ACTIONS.STATUS,
    content: { active: resolved },
  })
}
