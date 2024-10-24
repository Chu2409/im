'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/data-table'
import { productsColumns } from './columns'
import { IFullAlert } from '../types'

export const AlertsClient = ({ alerts }: { alerts: IFullAlert[] }) => {
  return (
    <>
      <Header
        title='Productos'
        description='Administra los productos de tu laboratorio'
      />

      <DataTable
        statusColumn
        data={alerts}
        columns={productsColumns}
        inputFilterKey='name'
      />
    </>
  )
}
