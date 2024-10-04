'use server'

import prisma from '@/lib/prisma'
import { Location } from '@prisma/client'

interface IUpdateLocation extends Partial<Omit<Location, 'id' | 'active'>> {}

export const updateLocation = async (id: number, data: IUpdateLocation) => {
  try {
    const location = await prisma.location.update({
      where: {
        id,
      },
      data,
    })

    return location
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[UPDATE_LOCATION]', error.message)
    return null
  }
}
