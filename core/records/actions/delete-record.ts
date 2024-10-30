'use server'

import { handleAction } from '@/core/shared/utils/action-handler'
import prisma from '@/core/shared/utils/prisma'

export const deleteRecord = async (id: number) => {
  const deleteRecord = async () =>
    !!(await prisma.record.delete({
      where: {
        id,
      },
    }))

  return await handleAction(deleteRecord, '[DELETE_RECORD]')
}
