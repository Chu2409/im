'use server'

import prisma from '@/lib/prisma'

export const toggleProductStatus = async (id: number, status: boolean) => {
  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        active: status,
      },
    })

    return !!product
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[TOGGLE_PRODUCT_STATUS]', error.message)
    return false
  }
}
