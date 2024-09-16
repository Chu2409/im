import { DataTable } from '@/core/shared/components/data-table'
import { locationColumns } from './columns'
import { getLocations } from '../actions/get-locations'

export const revalidate = 0

const LocationClient = async () => {
  const locations = await getLocations()

  return <DataTable columns={locationColumns} data={locations} />
}

export default LocationClient
