import { getProductsToRecord } from '@/core/products/actions/get-products-to-record'
import { getRecordsWithItems } from '@/core/records/actions/get-records-with-items'
import { RecordsClient } from '@/core/records/components/client'

export const revalidate = 0

const RecordsPage = async () => {
  const records = await getRecordsWithItems()
  const products = await getProductsToRecord()

  return <RecordsClient records={records} products={products} />
}

export default RecordsPage
