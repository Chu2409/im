'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/paginated/data-table'
import { productsColumns } from './columns'
import { IFullAlert } from '../types'
import { IPaginatedRes } from '@/core/shared/types/pagination'
import { alertFilters } from '../data/filters'

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
        filters={alertFilters}
        enableStatusFilter={false}
      />
    </>
  )
}
