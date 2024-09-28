'use server'

import prisma from '@/lib/prisma'

export const deleteRecord = async (id: number) => {
  try {
    const record = await prisma.record.delete({
      where: {
        id,
      },
    })

    return !!record
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[DELETE_RECORD]', error.message)
    return false
  }
}
