'use server'

import prisma from '@/lib/prisma'

export const toggleProviderStatus = async (id: number, status: boolean) => {
  try {
    const provider = await prisma.provider.update({
      where: {
        id,
      },
      data: {
        active: status,
      },
    })

    return !!provider
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[TOGGLE_PROVIDER_STATUS]', error.message)
    return false
  }
}
