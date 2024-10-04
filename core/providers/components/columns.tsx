'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'
import { DataTableRowActions } from '@/core/shared/components/table/data-table-row-actions'
import { Provider } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { toggleProviderStatus } from '../actions/toggle-provider-status'
import { useProviderModal } from '../hooks/use-provider-modal'
import { InactiveIndicator } from '@/core/shared/components/inactive-indicator'

export const providersColumns: ColumnDef<Provider>[] = [
  {
    accessorKey: 'name',
    meta: 'Nombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    ),
  },
  {
    accessorKey: 'status',
    meta: 'Estado',
    header: '',
    cell: ({ row }) => !row.original.active && <InactiveIndicator />,
    filterFn: (row, id, filterValue) => {
      const value = row.original.active ? 1 : 0
      return filterValue.includes(value)
    },
  },
  {
    accessorKey: 'contact',
    header: 'Contacto',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const onOpen = useProviderModal((state) => state.onOpen)

      return (
        <DataTableRowActions
          id={row.original.id}
          status={row.original.active}
          toggleStatus={toggleProviderStatus}
          onEdit={() => onOpen(row.original)}
        />
      )
    },
  },
]
