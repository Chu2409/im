import { DataTable } from '@/core/shared/components/data-table'
import { locationColumns } from './columns'

const LocationClient = () => {
  return <DataTable columns={locationColumns} data={[]} />
}

export default LocationClient
