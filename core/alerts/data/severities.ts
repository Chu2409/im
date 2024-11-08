import { IConstant, IOption } from '@/core/shared/types'

export const SEVERITIES: {
  [key: string]: IConstant
} = {
  HIGH: { id: 1, label: 'Alto', color: '#B41F1E' },
  MEDIUM: { id: 2, label: 'Medio', color: '#817417' },
  LOW: { id: 3, label: 'Bajo', color: '#89BE49' },
} as const

export const SEVERITIES_CONST: IConstant[] = Object.values(SEVERITIES)
export const SEVERITIES_OPTIONS: IOption[] = SEVERITIES_CONST.map(
  ({ id, label }) => ({
    id,
    label,
  }),
)

export const getSeverityConstById = (id: number): IConstant | undefined =>
  SEVERITIES_CONST.find((severity) => severity.id === id)

export const getSeverityConstByLabel = (label: string): IConstant | undefined =>
  SEVERITIES_CONST.find(
    (severity) => severity.label.toLowerCase() === label.toLowerCase(),
  )

export const getSeverityOptById = (id: number): IOption | undefined =>
  SEVERITIES_OPTIONS.find((severity) => severity.id === id)

export const getSeverityOptByLabel = (label: string): IOption | undefined =>
  SEVERITIES_OPTIONS.find(
    (severity) => severity.label.toLowerCase() === label.toLowerCase(),
  )
