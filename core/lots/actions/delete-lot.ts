'use server'

import prisma from '@/lib/prisma'

export const deleteLot = async (id: number) => {
  try {
    const record = await prisma.lot.delete({
      where: {
        id,
      },
    })

    return !!record
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[DELETE_LOT]', error.message)
    return false
  }
}
