'use server'

import { ACTIONS } from '@/core/shared/data/actions'
import { TABLES } from '@/core/shared/data/tables'
import { handleAction } from '@/core/shared/utils/actions-handlers'
import prisma from '@/core/shared/utils/prisma'

export const toggleProductStatus = async (id: number, status: boolean) => {
  const toggleProductStatus = async () =>
    !!(await prisma.product.update({
      where: {
        id,
      },
      data: {
        active: status,
      },
    }))

  return await handleAction(toggleProductStatus, '[TOGGLE_PRODUCT_STATUS]', {
    entityId: id,
    table: TABLES.PRODUCTS,
    action: ACTIONS.STATUS,
    content: { active: status },
  })
}
