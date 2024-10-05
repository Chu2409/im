'use server'

import prisma from '@/lib/prisma'

export const toggleLocationStatus = async (id: number, status: boolean) => {
  try {
    const location = await prisma.location.update({
      where: {
        id,
      },
      data: {
        active: status,
      },
    })

    return !!location
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[TOGGLE_LOCATION_STATUS]', error.message)
    return false
  }
}
