'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/paginated/data-table'
import { Location } from '@prisma/client'
import { locationColumns } from './columns'
import { useLocationModal } from '../hooks/use-location-modal'
import { LocationModal } from './modal'
import { IPaginatedRes } from '@/core/shared/types/pagination'
import { locationFilters } from '../data/filters'

export const LocationsClient = ({
  data,
}: {
  data: IPaginatedRes<Location> | undefined
}) => {
  const onOpen = useLocationModal((state) => state.onOpen)

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
        data={data}
        columns={locationColumns}
        inputFilterKey='name'
        filters={locationFilters}
      />
    </>
  )
}
