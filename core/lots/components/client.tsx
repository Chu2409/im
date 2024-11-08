'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/paginated/data-table'
import { useLotModal } from '../hooks/use-lot-modal'
import { IFullLot } from '../types'
import { lotColumns } from './columns'
import { LotModal } from './modal'
import { Location, Product, Provider } from '@prisma/client'
import { IPaginatedRes } from '@/core/shared/types/pagination'
import { lotFilters } from '../data/filters'

export const LotsClient = ({
  data,
  locations,
  products,
  providers,
}: {
  data: IPaginatedRes<IFullLot> | undefined
  locations: Location[]
  products: Product[]
  providers: Provider[]
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

      <LotModal
        locations={locations}
        products={products}
        providers={providers}
      />

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
