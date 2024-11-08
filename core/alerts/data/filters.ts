import {
  CATEGORIES,
  getCategoryConstById,
} from '@/core/products/data/categories'
import { getSeverityOptById, SEVERITIES_OPTIONS } from '../data/severities'
import { getTypeOptById, TYPES_OPTIONS } from '../data/types'
import { ALERT_STATUS_OPTIONS, getAlertStatusOptById } from '../data/states'
import { IFilter } from '@/core/shared/components/table/paginated/types'

export const alertFilters: IFilter[] = [
  {
    key: 'category',
    values: Object.values(CATEGORIES).map((category) => ({
      id: category.id,
      label: category.label,
    })),
    getById: getCategoryConstById,
  },
  {
    key: 'severity',
    values: SEVERITIES_OPTIONS,
    getById: getSeverityOptById,
  },
  {
    key: 'type',
    values: TYPES_OPTIONS,
    getById: getTypeOptById,
  },
  {
    key: 'status',
    values: ALERT_STATUS_OPTIONS,
    getById: getAlertStatusOptById,
  },
]
