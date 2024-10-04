import { Product, ProductProvider, Provider } from '@prisma/client'

interface IProductsProviders extends ProductProvider {
  provider: Provider | null
}

export interface IProductWithProviders extends Product {
  productsProviders: IProductsProviders[]
}
