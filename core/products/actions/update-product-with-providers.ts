'use server'

import prisma from '@/lib/prisma'

interface IUpdateProductWithProviders {
  name: string
  description: string
  category: string
  providersToCreate: number[]
  providersToDelete: number[]
}

export const updateProductWithProviders = async (
  id: number,
  {
    providersToCreate,
    providersToDelete,
    ...productToUpdate
  }: IUpdateProductWithProviders,
) => {
  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...productToUpdate,
      },
    })

    if (providersToCreate.length > 0) {
      const productProviders = await prisma.productProvider.createMany({
        data: providersToCreate.map((providerId) => ({
          providerId,
          productId: id,
        })),
      })

      return !!productProviders
    }

    if (providersToDelete.length > 0) {
      await prisma.productProvider.deleteMany({
        where: {
          productId: product.id,
          providerId: {
            in: providersToDelete,
          },
        },
      })
    }

    return !!product
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[UPDATE_PRODUCT_WITH_PROVIDERS]', error.message)
    return false
  }
}
