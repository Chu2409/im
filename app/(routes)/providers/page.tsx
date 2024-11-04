import { getProviders } from '@/core/providers/actions/get-providers'
import { ProvidersClient } from '@/core/providers/components/client'
import { IProviderPaginationParams } from '@/core/providers/types/pagination'
import { ISearchParams } from '@/core/shared/types/pagination'

export const revalidate = 0

const ProvidersPage = async ({
  searchParams,
}: ISearchParams<IProviderPaginationParams>) => {
  const params = await searchParams

  const { data } = await getProviders(params)

  return <ProvidersClient data={data} />
}

export default ProvidersPage
