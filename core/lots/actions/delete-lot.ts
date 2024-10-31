'use server'

import { ACTIONS } from '@/core/shared/data/actions'
import { TABLES } from '@/core/shared/data/tables'
import { handleAction } from '@/core/shared/utils/action-handler'
import prisma from '@/core/shared/utils/prisma'

export const deleteLot = async (id: number) => {
  const deleteLot = async () => {
    await prisma.lotLocation.deleteMany({
      where: {
        lotId: id,
      },
    })

    const record = await prisma.lot.delete({
      where: {
        id,
      },
    })

    return !!record
  }

  return await handleAction(deleteLot, '[DELETE_LOT]', {
    entityId: id,
    table: TABLES.LOTS,
    action: ACTIONS.DELETE,
  })
}
