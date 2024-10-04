'use server'

import prisma from '@/lib/prisma'

export const getLocation = async (id: number) => {
  try {
    const location = await prisma.location.findUnique({
      where: {
        id,
      },
    })

    return location
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_LOCATION]', error.message)
    return null
  }
}
