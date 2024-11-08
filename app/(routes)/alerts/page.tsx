import { getAlerts } from '@/core/alerts/actions/get-alerts'
import { AlertsClient } from '@/core/alerts/components/client'
import { IAlertPaginationParams } from '@/core/alerts/types/pagination'
import { ISearchParams } from '@/core/shared/types/pagination'

export const revalidate = 0

const AlertsPage = async ({
  searchParams,
}: ISearchParams<IAlertPaginationParams>) => {
  const params = await searchParams

  const { data } = await getAlerts(params)

  return <AlertsClient data={data} />
}

export default AlertsPage
