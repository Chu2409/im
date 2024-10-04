'use server'

import prisma from '@/lib/prisma'
import { Provider } from '@prisma/client'

interface ICreateProvider extends Omit<Provider, 'id' | 'active'> {}

export const createProvider = async (data: ICreateProvider) => {
  try {
    const provider = await prisma.provider.create({
      data,
    })

    return provider
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[CREATE_PROVIDER]', error.message)
    return null
  }
}
