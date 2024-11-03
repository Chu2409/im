import { IPaginationParams } from '../types/pagination'

export const DEFAULT_PAGE_LIMIT = 10

export const getPaginationParams = (params: IPaginationParams) => {
  const page = Math.max(1, Number(params?.page) || 1)
  const limit = Math.max(1, Number(params?.limit) || DEFAULT_PAGE_LIMIT)
  const skip = (page - 1) * limit

  return {
    skip,
    page,
    limit,
  }
}

export function isValidField(
  fieldName: string | undefined,
  modelFields: object,
): boolean {
  if (!fieldName) return false
  return Object.keys(modelFields).includes(fieldName)
}

type SortOrder = 'asc' | 'desc'
export function isValidSortOrder(
  sortOrder: string | undefined,
): sortOrder is SortOrder {
  if (!sortOrder) return false
  return ['asc', 'desc'].includes(sortOrder.toLowerCase())
}
