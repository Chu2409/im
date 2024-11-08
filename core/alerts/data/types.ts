import { IConstant } from '@/core/shared/types'

export const TYPES: {
  [key: string]: IConstant
} = {
  EXPIRATION: { id: 1, label: 'Expiración', color: '#681B98' },
  RESTOCK: { id: 2, label: 'Restock', color: '#1564BD' },
} as const

export const TYPES_CONST: IConstant[] = Object.values(TYPES)
export const TYPES_OPTIONS = TYPES_CONST.map(({ id, label }) => ({
  id,
  label,
}))

export const getTypeConstById = (id: number): IConstant | undefined =>
  TYPES_CONST.find((type) => type.id === id)

export const getTypeConstByLabel = (label: string): IConstant | undefined =>
  TYPES_CONST.find((type) => type.label.toLowerCase() === label.toLowerCase())

export const getTypeOptById = (id: number) =>
  TYPES_OPTIONS.find((type) => type.id === id)

export const getTypeOptByLabel = (label: string) =>
  TYPES_OPTIONS.find((type) => type.label.toLowerCase() === label.toLowerCase())
