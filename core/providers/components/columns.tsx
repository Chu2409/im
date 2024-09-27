'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'
import { DataTableRowActions } from '@/core/shared/components/table/data-table-row-actions'
import { Provider } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { deleteProvider } from '../actions/delete-provider'
import { useProviderModal } from '../hooks/use-provider-modal'

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
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const onOpen = useProviderModal((state) => state.onOpen)

      return (
        <DataTableRowActions
          id={row.original.id}
          onDelete={deleteProvider}
          deleteMessage='El proveedor ha sido eliminado correctamente'
          onEdit={() => onOpen(row.original)}
        />
      )
    },
  },
]
