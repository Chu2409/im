'use server'

import prisma from '@/lib/prisma'
import { Location } from '@prisma/client'

export const createLocation = async (data: Omit<Location, 'id'>) => {
  try {
    const location = prisma.location.create({
      data,
    })

    return location
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[CREATE_LOCATION]', error.message)
    return null
  }
}
