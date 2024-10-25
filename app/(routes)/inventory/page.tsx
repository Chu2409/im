import { getLocations } from '@/core/locations/actions/get-locations'
import { getFullLots } from '@/core/lots/actions/get-full-lots'
import { LotsClient } from '@/core/lots/components/client'
import { getProducts } from '@/core/products/actions/get-products'
import { getProviders } from '@/core/providers/actions/get-providers'

export const revalidate = 0

const LotsPage = async () => {
  const lots = await getFullLots()
  const locations = await getLocations()
  const products = await getProducts()
  const providers = await getProviders()

  return (
    <LotsClient
      lots={lots}
      locations={locations}
      products={products}
      providers={providers}
    />
  )
}

export default LotsPage
