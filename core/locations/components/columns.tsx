'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'
import { DataTableRowActions } from '@/core/shared/components/table/data-table-row-actions'
import { Location } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { deleteLocation } from '../actions/delete-location'

export const locationColumns: ColumnDef<Location>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'code',
    header: 'Código',
  },
  {
    accessorKey: 'laboratory',
    filterFn: (row, id, filterValue) =>
      filterValue.includes(row.original.laboratory),
    meta: 'Laboratorio',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Laboratorio' />
    ),
  },
  {
    id: 'Acciones',
    cell: ({ row }) => (
      <DataTableRowActions
        id={row.original.id}
        onDelete={deleteLocation}
        deleteMessage='La ubicación o locación ha sido eliminada correctamente'
        path='locations'
      />
    ),
  },
]
