import { getRecordsWithItems } from '@/core/records/actions/get-records-with-items'
import { RecordsClient } from '@/core/records/components/client'

export const revalidate = 0

const RecordsPage = async () => {
  const records = await getRecordsWithItems()

  return <RecordsClient records={records} />
}

export default RecordsPage
