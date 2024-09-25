'use client'

import { DataTableRowActions } from '@/core/shared/components/table/data-table-row-actions'
import { Provider } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

export const providersColumns: ColumnDef<Provider>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'contact',
    header: 'Contacto',
  },
  {
    id: 'Acciones',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
