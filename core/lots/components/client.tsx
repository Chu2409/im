'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/test/data-table'
import { useLotModal } from '../hooks/use-lot-modal'
import { IFullLot } from '../types'
import { lotColumns } from './columns'
import { CATEGORIES, getCategoryById } from '@/core/products/data/categories'
import { LotModal } from './modal'
import { Location, Product, Provider } from '@prisma/client'
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
]

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
        filters={filters}
        columns={lotColumns}
        enableStatusFilter={false}
      />
    </>
  )
}
