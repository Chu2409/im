import { getLocations } from '@/core/locations/actions/get-locations'
import { LocationClient } from '@/core/locations/components/client'

export const revalidate = 0

const LocationPage = async () => {
  const locations = await getLocations()

  return <LocationClient locations={locations} />
}

export default LocationPage
