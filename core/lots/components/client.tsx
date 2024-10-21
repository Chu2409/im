'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/data-table'
import { useInventoryModal } from '../hooks/use-inventory-modal'
import { IFullLot } from '../types'
import { lotColumns } from './columns'

export const LotsClient = ({ lots }: { lots: IFullLot[] }) => {
  const onOpen = useInventoryModal((state) => state.onOpen)

  return (
    <>
      <Header
        title='Inventario'
        description='Administra el inventario de tu laboratorio'
        buttonLabel='Nuevo lote'
        onButtonClick={() => onOpen()}
      />

      {/* <RecordModal lotProducts={lotProducts} /> */}

      <DataTable data={lots} columns={lotColumns} statusColumn={false} />
    </>
  )
}
