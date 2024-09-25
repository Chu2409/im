'use server'

import prisma from '@/lib/prisma'

export const getProvider = async (id: number) => {
  try {
    const provider = prisma.provider.findUnique({
      where: {
        id,
      },
    })

    return provider
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_PROVIDER]', error.message)
    return null
  }
}
