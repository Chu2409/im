'use server'

import prisma from '@/lib/prisma'
import { Provider } from '@prisma/client'

interface IUpdateProvider extends Partial<Omit<Provider, 'id' | 'active'>> {}

export const updateProvider = async (id: number, data: IUpdateProvider) => {
  try {
    const location = await prisma.provider.update({
      where: {
        id,
      },
      data,
    })

    return location
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[UPDATE_PROVIDER]', error.message)
    return null
  }
}
