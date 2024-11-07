import { IConstant } from '@/core/shared/types'

export const TYPES = {
  EXPIRATION: { id: 1, name: 'Expiración', color: '#681B98' },
  RESTOCK: { id: 2, name: 'Restock', color: '#1564BD' },
} as const

export const getTypeByName = (name: string): IConstant | undefined => {
  return Object.values(TYPES).find(
    (type) => type.name.toLowerCase() === name.toLowerCase(),
  )
}

export const getTypeById = (id: number): IConstant | undefined => {
  return Object.values(TYPES).find((type) => type.id === id)
}
