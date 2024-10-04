'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IItemWithProduct } from '../types'
import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'

export const itemsColumns: ColumnDef<IItemWithProduct>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => <div className=''>{row.original.product.name}</div>,
  },
  {
    accessorKey: 'quantity',
    meta: 'Cantidad',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Cantidad' />
    ),
  },
]
