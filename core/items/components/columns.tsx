'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IItemWithLotLocation } from '../types'
import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'

export const itemsColumns: ColumnDef<IItemWithLotLocation>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => (
      <div className=''>{row.original.lotLocation.lot.product.name}</div>
    ),
  },
  {
    accessorKey: 'quantity',
    meta: 'Cantidad',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Cantidad' />
    ),
  },
  {
    accessorKey: 'lot',
    header: 'Lote',
    cell: ({ row }) => (
      <div className=''>{row.original.lotLocation.lot.id}</div>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Ubicación',
    cell: ({ row }) => (
      <div className=''>
        {row.original.lotLocation.location.code} -{' '}
        {row.original.lotLocation.location.laboratory}
      </div>
    ),
  },
]
