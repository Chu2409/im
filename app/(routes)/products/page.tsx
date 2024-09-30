import { getProductsWithProviders } from '@/core/products/actions/get-products-with-providers'
import { ProductsClient } from '@/core/products/components/client'

export const revalidate = 0

const ProductsPage = async () => {
  const products = await getProductsWithProviders()

  return <ProductsClient products={products} />
}

export default ProductsPage
