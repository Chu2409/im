import { getLocation } from '@/core/locations/actions/get-location'
import { LocationClient } from '@/core/locations/components/single-client'

const LocationPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const id = Number(params.id)
  const location = id ? await getLocation(id) : null

  return <LocationClient location={location} />
}

export default LocationPage
