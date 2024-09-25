import { getProvider } from '@/core/providers/actions/get-provider'
import { ProviderClient } from '@/core/providers/components/single-client'

const ProviderPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const id = Number(params.id)
  const provider = id ? await getProvider(id) : null

  return <ProviderClient provider={provider} />
}

export default ProviderPage
