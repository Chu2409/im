import { CATEGORIES_OPTIONS, getCategoryOptById } from './categories'
import { IDatTablePaginatedFilter } from '@/core/shared/types'

export const productFilters: IDatTablePaginatedFilter[] = [
  {
    key: 'category',
    values: CATEGORIES_OPTIONS,
    getById: getCategoryOptById,
  },
]
