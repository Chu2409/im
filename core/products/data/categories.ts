import { IConstant } from '@/core/shared/types'

export const CATEGORIES = {
  AGENTS: { id: 1, name: 'Reactivos', color: '#EB971F' },
  INPUTS: { id: 2, name: 'Insumos', color: '#518AAD' },
  EQUIPMENT: { id: 3, name: 'Equipos', color: '#50616B' },
  MATERIALS: { id: 4, name: 'Materiales', color: '#967C57' },
} as const

export const getCategoryByName = (name: string): IConstant | undefined => {
  return Object.values(CATEGORIES).find(
    (category) => category.name.toLowerCase() === name.toLowerCase(),
  )
}

export const getCategoryById = (id: number): IConstant | undefined =>
  Object.values(CATEGORIES).find((category) => category.id === id)
