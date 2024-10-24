import { IConstant } from '@/core/shared/types'

export const SEVERITIES = {
  HIGH: { id: 1, name: 'Alto', color: '#B41F1E' },
  MEDIUM: { id: 2, name: 'Medio', color: '#817417' },
  LOW: { id: 3, name: 'Bajo', color: '#89BE49' },
} as const

export const getSeverityByName = (name: string): IConstant | undefined => {
  return Object.values(SEVERITIES).find(
    (type) => type.name.toLowerCase() === name.toLowerCase(),
  )
}
