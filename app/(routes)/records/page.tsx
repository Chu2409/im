import { getRecords } from '@/core/records/actions/get-records'
import { RecordsClient } from '@/core/records/components/client'

export const revalidate = 0

const RecordsPage = async () => {
  const records = await getRecords()

  return <RecordsClient records={records} />
}

export default RecordsPage
