'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'
import { DataTableRowActions } from '@/core/shared/components/table/data-table-row-actions'
import { Location } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { deleteLocation } from '../actions/delete-location'
import { useLocationrModal } from '../hooks/use-location-modal'

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
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const onOpen = useLocationrModal((state) => state.onOpen)

      return (
        <DataTableRowActions
          id={row.original.id}
          onDelete={deleteLocation}
          deleteMessage='La ubicación o locación ha sido eliminada correctamente'
          onEdit={() => onOpen(row.original)}
        />
      )
    },
  },
]
