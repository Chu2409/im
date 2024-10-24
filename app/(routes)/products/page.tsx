import { getProducts } from '@/core/products/actions/get-products'
import { ProductsClient } from '@/core/products/components/client'

export const revalidate = 0

const ProductsPage = async () => {
  const products = await getProducts(true)

  return <ProductsClient products={products} />
}

export default ProductsPage
