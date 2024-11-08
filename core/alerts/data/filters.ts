import {
  CATEGORIES_OPTIONS,
  getCategoryConstById,
} from '@/core/products/data/categories'
import { getSeverityOptById, SEVERITIES_OPTIONS } from '../data/severities'
import { getTypeOptById, TYPES_OPTIONS } from '../data/types'
import { ALERT_STATUS_OPTIONS, getAlertStatusOptById } from '../data/states'
import { IDatTablePaginatedFilter } from '@/core/shared/types'

export const alertFilters: IDatTablePaginatedFilter[] = [
  {
    key: 'category',
    values: CATEGORIES_OPTIONS,
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
