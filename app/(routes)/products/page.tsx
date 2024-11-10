import { getProducts } from '@/core/products/actions/get-products'
import { ProductsClient } from '@/core/products/components/client'
import { IProductPaginationParams } from '@/core/products/types/pagination'
import { ISearchParams } from '@/core/shared/types/pagination'

const ProductsPage = async ({
  searchParams,
}: ISearchParams<IProductPaginationParams>) => {
  const params = await searchParams

  const { data } = await getProducts(params)

  return <ProductsClient data={data} />
}

export default ProductsPage
