import { IConstant } from '@/core/shared/types'

export const ALERT_STATUS = {
  RESOLVED: { id: 1, name: 'Resuelta', color: '#00A86B' },
  UNRESOLVED: { id: 0, name: 'No Resuelta', color: '#FF0000' },
} as const

export const getAlertStatusByName = (name: string): IConstant | undefined => {
  return Object.values(ALERT_STATUS).find(
    (state) => state.name.toLowerCase() === name.toLowerCase(),
  )
}

export const getAlertStatusById = (id: number): IConstant | undefined => {
  return Object.values(ALERT_STATUS).find((state) => state.id === id)
}
