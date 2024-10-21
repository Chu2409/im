import { getFullLots } from '@/core/lots/actions/get-full-lots'
import { LotsClient } from '@/core/lots/components/client'

export const revalidate = 0

const LotsPage = async () => {
  const lots = await getFullLots()

  return <LotsClient lots={lots} />
}

export default LotsPage
