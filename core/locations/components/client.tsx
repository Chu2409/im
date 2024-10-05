'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/data-table'
import { Location } from '@prisma/client'
import { locationColumns } from './columns'
import { useLocationrModal } from '../hooks/use-location-modal'
import { LocationModal } from './modal'
import { LABORATORIES } from '../data/labobratories'

const filters = [
  {
    key: 'laboratory',
    values: Object.values(LABORATORIES).map((laboratory) => ({
      value: laboratory.id,
      label: laboratory.name,
    })),
  },
]

export const LocationsClient = ({ locations }: { locations: Location[] }) => {
  const onOpen = useLocationrModal((state) => state.onOpen)

  return (
    <>
      <Header
        title='Locaciones'
        description='Administra las locaciones o ubicaciones disponibles en los laboratorios.'
        buttonLabel='Nueva locación'
        onButtonClick={() => onOpen()}
      />

      <LocationModal />

      <DataTable
        data={locations}
        columns={locationColumns}
        inputFilterKey='name'
        filters={filters}
        statusColumn
      />
    </>
  )
}
