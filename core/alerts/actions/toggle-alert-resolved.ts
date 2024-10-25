'use server'

import prisma from '@/lib/prisma'

export const toggleAlertResolved = async (id: number, resolved: boolean) => {
  try {
    const alert = await prisma.alert.update({
      where: {
        id,
      },
      data: {
        resolved,
      },
    })

    return !!alert
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[TOGGLE_ALERT_RESOLVED]', error.message)
    return false
  }
}
