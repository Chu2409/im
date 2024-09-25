'use server'

import prisma from '@/lib/prisma'

export const getProviders = async () => {
  try {
    const providers = await prisma.provider.findMany({})

    return providers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_PROVIDERS]', error.message)
    return []
  }
}
