import { IConstant } from '@/core/shared/types'

export const LABORATORIES: {
  [key: string]: IConstant
} = {
  CENTER: { id: 1, label: 'Centro', color: '#323BEA' },
  SOUTH: { id: 2, label: 'Sur', color: '#AD9B51' },
} as const

export const LABORATORIES_CONST: IConstant[] = Object.values(LABORATORIES)
export const LABORATORIES_OPTIONS = LABORATORIES_CONST.map(({ id, label }) => ({
  id,
  label,
}))

export const getLaboratoryConstById = (id: number): IConstant | undefined =>
  LABORATORIES_CONST.find((laboratory) => laboratory.id === id)

export const getLaboratoryConstByLabel = (
  label: string,
): IConstant | undefined =>
  LABORATORIES_CONST.find(
    (laboratory) => laboratory.label.toLowerCase() === label.toLowerCase(),
  )

export const getLaboratoryOptById = (id: number) =>
  LABORATORIES_OPTIONS.find((laboratory) => laboratory.id === id)

export const getLaboratoryOptByLabel = (label: string) =>
  LABORATORIES_OPTIONS.find(
    (laboratory) => laboratory.label.toLowerCase() === label.toLowerCase(),
  )
