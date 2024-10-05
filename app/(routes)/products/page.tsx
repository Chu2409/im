import { getProductsWithProviders } from '@/core/products/actions/get-products-with-providers'
import { ProductsClient } from '@/core/products/components/client'
import { getProviders } from '@/core/providers/actions/get-providers'

export const revalidate = 0

const ProductsPage = async () => {
  const products = await getProductsWithProviders(true)
  const providers = await getProviders()

  return <ProductsClient products={products} providers={providers} />
}

export default ProductsPage
