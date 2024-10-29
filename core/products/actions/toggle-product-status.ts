'use server'

import { handleAction } from '@/core/shared/utils/action-handler'
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

  return await handleAction(toggleProductStatus, '[TOGGLE_PRODUCT_STATUS]')
}
