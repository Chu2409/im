import { IFilter } from '@/core/shared/components/table/paginated/types'
import { CATEGORIES_OPTIONS, getCategoryOptById } from './categories'

export const productFilters: IFilter[] = [
  {
    key: 'category',
    values: CATEGORIES_OPTIONS,
    getById: getCategoryOptById,
  },
]
