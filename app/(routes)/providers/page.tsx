import { getProviders } from '@/core/providers/actions/get-providers'
import { ProvidersClient } from '@/core/providers/components/client'

export const revalidate = 0

const ProvidersPage = async () => {
  const providers = await getProviders()

  return <ProvidersClient providers={providers} />
}

export default ProvidersPage
