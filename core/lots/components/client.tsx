'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/paginated/data-table'
import { useLotModal } from '../hooks/use-lot-modal'
import { IFullLot } from '../types'
import { lotColumns } from './columns'
import { LotModal } from './modal'
import { IPaginatedRes } from '@/core/shared/types/pagination'
import { lotFilters } from '../data/filters'

export const LotsClient = ({
  data,
}: {
  data: IPaginatedRes<IFullLot> | undefined
}) => {
  const onOpen = useLotModal((state) => state.onOpen)

  return (
    <>
      <Header
        title='Inventario'
        description='Administra el inventario de tu laboratorio'
        buttonLabel='Nuevo lote'
        onButtonClick={() => onOpen()}
      />

      <LotModal />

      <DataTable
        inputFilterKey='product'
        data={data}
        filters={lotFilters}
        columns={lotColumns}
        enableStatusFilter={false}
      />
    </>
  )
}
