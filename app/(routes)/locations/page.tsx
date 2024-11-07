import { getLocations } from '@/core/locations/actions/get-locations'
import { LocationsClient } from '@/core/locations/components/client'
import { ILocationPaginationParams } from '@/core/locations/types/pagination'
import { ISearchParams } from '@/core/shared/types/pagination'

export const revalidate = 0

const LocationsPage = async ({
  searchParams,
}: ISearchParams<ILocationPaginationParams>) => {
  const params = await searchParams

  const { data } = await getLocations(params)

  return <LocationsClient data={data} />
}

export default LocationsPage
