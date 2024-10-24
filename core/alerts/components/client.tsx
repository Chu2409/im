'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/data-table'
import { productsColumns } from './columns'
import { IFullAlert } from '../types'
import { CATEGORIES } from '@/core/products/data/categories'
import { SEVERITIES } from '../data/severities'
import { TYPES } from '../data/types'

const filters = [
  {
    key: 'category',
    values: Object.values(CATEGORIES).map((category) => ({
      value: category.id,
      label: category.name,
    })),
  },
  {
    key: 'severity',
    values: Object.values(SEVERITIES).map((severity) => ({
      value: severity.id,
      label: severity.name,
    })),
  },
  {
    key: 'type',
    values: Object.values(TYPES).map((type) => ({
      value: type.id,
      label: type.name,
    })),
  },
]

export const AlertsClient = ({ alerts }: { alerts: IFullAlert[] }) => {
  return (
    <>
      <Header
        title='Alertas'
        description='Revise las alertas de su laboratorio'
      />

      <DataTable
        statusColumn={false}
        data={alerts}
        columns={productsColumns}
        inputFilterKey='product'
        filters={filters}
      />
    </>
  )
}
