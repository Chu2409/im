'use server'

import prisma from '@/lib/prisma'

interface ICreateProductWithProviders {
  name: string
  description: string
  category: string
  providers: number[]
}

export const createProductWithProviders = async ({
  providers,
  ...productToCreate
}: ICreateProductWithProviders) => {
  try {
    const product = await prisma.product.create({
      data: {
        ...productToCreate,
      },
    })

    if (providers.length > 0) {
      const productProviders = await prisma.productProvider.createMany({
        data: providers.map((providerId) => ({
          providerId,
          productId: product.id,
        })),
      })

      return !!productProviders
    }

    return !!product
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[CREATE_PRODUCT_WITH_PROVIDERS]', error.message)
    return false
  }
}
