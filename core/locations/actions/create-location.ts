'use server'

import prisma from '@/lib/prisma'
import { Location } from '@prisma/client'

interface ICreateLocation extends Omit<Location, 'id' | 'active'> {}

export const createLocation = async (data: ICreateLocation) => {
  try {
    const location = await prisma.location.create({
      data,
    })

    return location
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[CREATE_LOCATION]', error.message)
    return null
  }
}
