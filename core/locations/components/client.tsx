import { DataTable } from '@/core/shared/components/data-table'
import { getLocations } from '../actions/get-locations'
import { locationColumns } from './columns'

export const revalidate = 0

export const LocationClient = async () => {
  const locations = await getLocations()

  return <DataTable columns={locationColumns} data={locations} />
}
