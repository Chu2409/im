import { getAlerts } from '@/core/alerts/actions/get-alerts'
import { AlertsClient } from '@/core/alerts/components/client'

export const revalidate = 0

const AlertsPage = async () => {
  const { data: alerts = [] } = await getAlerts()

  return <AlertsClient alerts={alerts} />
}

export default AlertsPage
