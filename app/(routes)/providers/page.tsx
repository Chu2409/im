import { getProviders } from '@/core/providers/actions/get-providers'
import { ProvidersClient } from '@/core/providers/components/client'

export const revalidate = 0

const ProvidersPage = async () => {
  const { data: providers = [] } = await getProviders(true)

  return <ProvidersClient providers={providers} />
}

export default ProvidersPage
