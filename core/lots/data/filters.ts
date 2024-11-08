import {
  CATEGORIES_OPTIONS,
  getCategoryOptById,
} from '@/core/products/data/categories'
import { IFilter } from '@/core/shared/components/table/paginated/types'

export const lotFilters: IFilter[] = [
  {
    key: 'category',
    values: CATEGORIES_OPTIONS,
    getById: getCategoryOptById,
  },
]
