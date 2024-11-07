'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/test/data-table-column-header'
import { DataTableRowActions } from '@/core/shared/components/table/test/data-table-row-actions'
import { Provider } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { toggleProviderStatus } from '../actions/toggle-provider-status'
import { useProviderModal } from '../hooks/use-provider-modal'
import { FlagIndicator } from '@/core/shared/components/flag-indicator'

export const providersColumns: ColumnDef<Provider>[] = [
  {
    accessorKey: 'id',
    meta: 'Id',
    header: () => <div className='text-center'>ID</div>,
    cell: ({ row }) => <div className='text-center'>{row.original.id}</div>,
  },
  {
    accessorKey: 'name',
    meta: 'Nombre',
    header: () => <DataTableColumnHeader title='Nombre' sort='name' />,
  },
  {
    accessorKey: 'status',
    meta: 'Estado',
    header: '',
    cell: ({ row }) => !row.original.active && <FlagIndicator />,
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

      const toggleStatus = async (id: number, status: boolean) => {
        const { data: deleted } = await toggleProviderStatus(id, status)

        return deleted
      }

      return (
        <DataTableRowActions
          id={row.original.id}
          status={row.original.active}
          toggleStatus={toggleStatus}
          onEdit={() => onOpen(row.original)}
        />
      )
    },
  },
]
