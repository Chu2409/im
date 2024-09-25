'use server'

import prisma from '@/lib/prisma'

export const deleteLocation = async (id: number) => {
  try {
    const provider = prisma.location.delete({
      where: {
        id,
      },
    })

    return !!provider
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[DELETE_LOCATION]', error.message)
    return false
  }
}
