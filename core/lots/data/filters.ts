import {
  CATEGORIES_OPTIONS,
  getCategoryOptById,
} from '@/core/products/data/categories'
import { IDatTablePaginatedFilter } from '@/core/shared/types'

export const lotFilters: IDatTablePaginatedFilter[] = [
  {
    key: 'category',
    values: CATEGORIES_OPTIONS,
    getById: getCategoryOptById,
  },
]
