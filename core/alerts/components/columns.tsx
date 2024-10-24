'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'
import { ColumnDef } from '@tanstack/react-table'
import { IFullAlert } from '../types'

export const productsColumns: ColumnDef<IFullAlert>[] = [
  {
    accessorKey: 'name',
    meta: 'Nombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    ),
  },
]
