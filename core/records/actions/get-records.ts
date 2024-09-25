'use server'

import prisma from '@/lib/prisma'

export const getRecords = async () => {
  try {
    const records = await prisma.record.findMany({})

    return records
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_RECORDS]', error.message)
    return []
  }
}
