'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'
import { DataTableRowActions } from '@/core/shared/components/table/data-table-row-actions'
import { Provider } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { deleteProvider } from '../actions/delete-provider'

export const providersColumns: ColumnDef<Provider>[] = [
  {
    accessorKey: 'name',
    meta: 'Nombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    ),
  },
  {
    accessorKey: 'contact',
    header: 'Contacto',
  },
  {
    id: 'Acciones',
    cell: ({ row }) => (
      <DataTableRowActions
        id={row.original.id}
        path='providers'
        deleteMessage='El proveedor ha sido eliminado correctamente'
        onDelete={deleteProvider}
      />
    ),
  },
]
