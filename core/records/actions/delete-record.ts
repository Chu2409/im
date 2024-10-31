'use server'

import { ACTIONS } from '@/core/shared/data/actions'
import { TABLES } from '@/core/shared/data/tables'
import { handleAction } from '@/core/shared/utils/action-handler'
import prisma from '@/core/shared/utils/prisma'

export const deleteRecord = async (id: number) => {
  const deleteRecord = async () =>
    !!(await prisma.record.delete({
      where: {
        id,
      },
    }))

  return await handleAction(deleteRecord, '[DELETE_RECORD]', {
    entityId: id,
    table: TABLES.RECORDS,
    action: ACTIONS.DELETE,
  })
}
