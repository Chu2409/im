'use server'

import prisma from '@/lib/prisma'

export const deleteProvider = async (id: number) => {
  try {
    const provider = prisma.provider.delete({
      where: {
        id,
      },
    })

    return !!provider
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[DELETE_PROVIDER]', error.message)
    return false
  }
}
