'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/data-table'
import { Location } from '@prisma/client'
import { locationColumns } from './columns'
import { Option } from '@/core/shared/components/table/types'

const generateUniqueLaboratoryOptions = (locations: Location[]): Option[] => {
  const uniqueLaboratories = Array.from(
    new Set(locations.map((location) => location.laboratory)),
  )
  return uniqueLaboratories.map((laboratory) => ({
    label: laboratory,
    value: laboratory,
  }))
}

export const LocationClient = ({ locations }: { locations: Location[] }) => {
  const filters = [
    {
      key: 'laboratory',
      values: generateUniqueLaboratoryOptions(locations),
    },
  ]

  return (
    <>
      <Header
        title='Locaciones'
        description='Administra las locaciones o ubicaciones disponibles en los laboratorios.'
        buttonLabel='Nueva locación'
      />

      <DataTable
        data={locations}
        columns={locationColumns}
        inputFilterKey='name'
        filters={filters}
      />
    </>
  )
}
