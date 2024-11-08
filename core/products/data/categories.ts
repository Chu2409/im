import { IConstant } from '@/core/shared/types'

export const CATEGORIES: {
  [key: string]: IConstant
} = {
  AGENTS: { id: 1, label: 'Reactivos', color: '#EB971F' },
  INPUTS: { id: 2, label: 'Insumos', color: '#518AAD' },
  EQUIPMENT: { id: 3, label: 'Equipos', color: '#50616B' },
  MATERIALS: { id: 4, label: 'Materiales', color: '#967C57' },
} as const

export const CATEGORIES_CONST: IConstant[] = Object.values(CATEGORIES)
export const CATEGORIES_OPTIONS = CATEGORIES_CONST.map(({ id, label }) => ({
  id,
  label,
}))

export const getCategoryConstById = (id: number): IConstant | undefined =>
  CATEGORIES_CONST.find((category) => category.id === id)

export const getCategoryConstByLabel = (label: string): IConstant | undefined =>
  CATEGORIES_CONST.find(
    (category) => category.label.toLowerCase() === label.toLowerCase(),
  )

export const getCategoryOptById = (id: number) =>
  CATEGORIES_OPTIONS.find((category) => category.id === id)

export const getCategoryOptByLabel = (label: string) =>
  CATEGORIES_OPTIONS.find(
    (category) => category.label.toLowerCase() === label.toLowerCase(),
  )
