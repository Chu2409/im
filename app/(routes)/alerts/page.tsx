import { getLocations } from '@/core/locations/actions/get-locations'
import { LocationsClient } from '@/core/locations/components/client'

export const revalidate = 0

const AlertsPage = async () => {
  const locations = await getLocations(true)

  return <LocationsClient locations={locations} />
}

export default AlertsPage
