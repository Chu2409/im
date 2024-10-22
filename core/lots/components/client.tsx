'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/data-table'
import { useLotModal } from '../hooks/use-lot-modal'
import { IFullLot } from '../types'
import { lotColumns } from './columns'
import { CATEGORIES } from '@/core/products/data/categories'
import { LotModal } from './modal'
import { Location } from '@prisma/client'

const filters = [
  {
    key: 'category',
    values: Object.values(CATEGORIES).map((category) => ({
      value: category.id,
      label: category.name,
    })),
  },
]

export const LotsClient = ({
  lots,
  locations,
}: {
  lots: IFullLot[]
  locations: Location[]
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

      <LotModal locations={locations} />

      <DataTable
        inputFilterKey='product'
        data={lots}
        filters={filters}
        columns={lotColumns}
        statusColumn={false}
      />
    </>
  )
}
