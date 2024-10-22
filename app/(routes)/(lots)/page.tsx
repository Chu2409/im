import { getLocations } from '@/core/locations/actions/get-locations'
import { getFullLots } from '@/core/lots/actions/get-full-lots'
import { LotsClient } from '@/core/lots/components/client'

export const revalidate = 0

const LotsPage = async () => {
  const lots = await getFullLots()
  const locations = await getLocations()

  return <LotsClient lots={lots} locations={locations} />
}

export default LotsPage
