'use server'

import prisma from '@/core/shared/utils/prisma'

export const getProvider = async (id: number) => {
  try {
    const provider = await prisma.provider.findUnique({
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
