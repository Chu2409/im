import { IConstant } from '@/core/shared/types'

export const LABORATORIES = {
  CENTER: { id: 1, name: 'Centro', color: '#323BEA' },
  SOUTH: { id: 2, name: 'Sur', color: '#AD9B51' },
} as const

export const getLaboratoryByName = (name: string): IConstant | undefined => {
  return Object.values(LABORATORIES).find(
    (lab) => lab.name.toLowerCase() === name.toLowerCase(),
  )
}
