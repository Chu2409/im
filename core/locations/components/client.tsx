'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/data-table'
import { Location } from '@prisma/client'
import { locationColumns } from './columns'
import { IOption } from '@/core/shared/components/table/types'
import { useLocationrModal } from '../hooks/use-location-modal'
import { LocationModal } from './modal'

const generateUniqueLaboratoryOptions = (locations: Location[]): IOption[] => {
  const uniqueLaboratories = Array.from(
    new Set(locations.map((location) => location.laboratory)),
  )
  return uniqueLaboratories.map((laboratory) => ({
    label: laboratory,
    value: laboratory,
  }))
}

export const LocationsClient = ({ locations }: { locations: Location[] }) => {
  const filters = [
    {
      key: 'laboratory',
      values: generateUniqueLaboratoryOptions(locations),
    },
  ]

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
      />
    </>
  )
}
