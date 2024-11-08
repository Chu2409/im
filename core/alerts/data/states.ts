import { IConstant } from '@/core/shared/types'

export const ALERT_STATUS: {
  [key: string]: IConstant
} = {
  RESOLVED: { id: 1, label: 'Resuelta', color: '#00A86B' },
  UNRESOLVED: { id: 0, label: 'No Resuelta', color: '#FF0000' },
} as const

export const ALERT_STATUS_CONST: IConstant[] = Object.values(ALERT_STATUS)
export const ALERT_STATUS_OPTIONS = ALERT_STATUS_CONST.map(({ id, label }) => ({
  id,
  label,
}))

export const getAlertStatusConstById = (id: number): IConstant | undefined =>
  ALERT_STATUS_CONST.find((status) => status.id === id)

export const getAlertStatusConstByLabel = (
  label: string,
): IConstant | undefined =>
  ALERT_STATUS_CONST.find(
    (status) => status.label.toLowerCase() === label.toLowerCase(),
  )

export const getAlertStatusOptById = (id: number) =>
  ALERT_STATUS_OPTIONS.find((status) => status.id === id)

export const getAlertStatusOptByLabel = (label: string) =>
  ALERT_STATUS_OPTIONS.find(
    (status) => status.label.toLowerCase() === label.toLowerCase(),
  )
