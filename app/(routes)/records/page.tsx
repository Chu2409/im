import { getLotProductsToRecord } from '@/core/lots/actions/get-lot-products-to-record'
import { getRecordsWithItems } from '@/core/records/actions/get-records-with-items'
import { RecordsClient } from '@/core/records/components/client'
import { IRecordPaginationParams } from '@/core/records/types/pagination'
import { ISearchParams } from '@/core/shared/types/pagination'

export const revalidate = 0

const RecordsPage = async ({
  searchParams,
}: ISearchParams<IRecordPaginationParams>) => {
  const params = await searchParams

  const { data } = await getRecordsWithItems(params)
  const { data: lotProducts = [] } = await getLotProductsToRecord()

  return <RecordsClient data={data} lotProducts={lotProducts} />
}

export default RecordsPage
