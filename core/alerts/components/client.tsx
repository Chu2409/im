'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/test/data-table'
import { productsColumns } from './columns'
import { IFullAlert } from '../types'
import { CATEGORIES, getCategoryById } from '@/core/products/data/categories'
import { getSeverityById, SEVERITIES } from '../data/severities'
import { getTypeById, TYPES } from '../data/types'
import { ALERT_STATUS, getAlertStatusById } from '../data/states'
import { IPaginatedRes } from '@/core/shared/types/pagination'

const filters = [
  {
    key: 'category',
    values: Object.values(CATEGORIES).map((category) => ({
      id: category.id,
      label: category.name,
    })),
    getById: getCategoryById,
  },
  {
    key: 'severity',
    values: Object.values(SEVERITIES).map((severity) => ({
      id: severity.id,
      label: severity.name,
    })),
    getById: getSeverityById,
  },
  {
    key: 'type',
    values: Object.values(TYPES).map((type) => ({
      id: type.id,
      label: type.name,
    })),
    getById: getTypeById,
  },
  {
    key: 'status',
    values: Object.values(ALERT_STATUS).map((status) => ({
      id: status.id,
      label: status.name,
    })),
    getById: getAlertStatusById,
  },
]

export const AlertsClient = ({
  data,
}: {
  data: IPaginatedRes<IFullAlert> | undefined
}) => {
  return (
    <>
      <Header
        title='Alertas'
        description='Revise las alertas de su laboratorio'
      />

      <DataTable
        data={data}
        columns={productsColumns}
        inputFilterKey='product'
        filters={filters}
        enableStatusFilter={false}
      />
    </>
  )
}
