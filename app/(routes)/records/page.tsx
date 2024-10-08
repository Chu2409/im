import { getLotProductsToRecord } from '@/core/lots/actions/get-lot-products-to-record'
import { getRecordsWithItems } from '@/core/records/actions/get-records-with-items'
import { RecordsClient } from '@/core/records/components/client'

export const revalidate = 0

const RecordsPage = async () => {
  const records = await getRecordsWithItems()
  const lotProducts = await getLotProductsToRecord()

  return <RecordsClient records={records} lotProducts={lotProducts} />
}

export default RecordsPage
