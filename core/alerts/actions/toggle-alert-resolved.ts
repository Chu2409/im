'use server'

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

  return await handleAction(toggleAlertResolved, '[TOGGLE_ALERT_RESOLVED]')
}
