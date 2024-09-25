'use server'

import prisma from '@/lib/prisma'
import { Provider } from '@prisma/client'

export const createProvider = async (data: Omit<Provider, 'id'>) => {
  try {
    const provider = prisma.provider.create({
      data,
    })

    return provider
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[CREATE_PROVIDER]', error.message)
    return null
  }
}
