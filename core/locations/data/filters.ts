import { getLaboratoryOptById, LABORATORIES_OPTIONS } from './labobratories'
import { IDatTablePaginatedFilter } from '@/core/shared/types'

export const locationFilters: IDatTablePaginatedFilter[] = [
  {
    key: 'laboratory',
    values: LABORATORIES_OPTIONS,
    getById: getLaboratoryOptById,
  },
]
