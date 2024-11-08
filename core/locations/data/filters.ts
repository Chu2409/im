import { IFilter } from '@/core/shared/components/table/paginated/types'
import { getLaboratoryOptById, LABORATORIES_OPTIONS } from './labobratories'

export const locationFilters: IFilter[] = [
  {
    key: 'laboratory',
    values: LABORATORIES_OPTIONS,
    getById: getLaboratoryOptById,
  },
]
