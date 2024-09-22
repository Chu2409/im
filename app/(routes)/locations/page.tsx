import { getLocations } from '@/core/locations/actions/get-locations'
import { LocationsClient } from '@/core/locations/components/client'

export const revalidate = 0

const LocationsPage = async () => {
  const locations = await getLocations()

  return <LocationsClient locations={locations} />
}

export default LocationsPage
