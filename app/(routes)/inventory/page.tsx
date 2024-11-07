import { getFullLots } from '@/core/lots/actions/get-full-lots'
import { LotsClient } from '@/core/lots/components/client'
import { IProductPaginationParams } from '@/core/products/types/pagination'
import { ISearchParams } from '@/core/shared/types/pagination'

export const revalidate = 0

const LotsPage = async ({
  searchParams,
}: ISearchParams<IProductPaginationParams>) => {
  const params = await searchParams

  const { data } = await getFullLots(params)
  // const { data: locations = [] } = await getLocations()
  // const { data: products = [] } = await getProducts()
  // const { data: providers = [] } = await getProviders()

  return <LotsClient data={data} locations={[]} products={[]} providers={[]} />
}

export default LotsPage
