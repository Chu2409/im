'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IItemWithLotLocation } from '../types'
import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'
import { getLaboratoryByName } from '@/core/locations/data/labobratories'
import { Badge } from '@/ui/badge'

export const itemsColumns: ColumnDef<IItemWithLotLocation>[] = [
  {
    accessorKey: 'lot',
    meta: 'Lote',
    header: () => <div className='text-center'>Lote</div>,
    cell: ({ row }) => (
      <div className='text-center'>{row.original.lotLocation.lot.id}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => (
      <div className=''>{row.original.lotLocation.lot.product.name}</div>
    ),
  },

  {
    accessorKey: 'location',
    header: 'Ubicación',
    cell: ({ row }) => {
      const laboratory = getLaboratoryByName(
        row.original.lotLocation.location.laboratory,
      )

      return (
        <div className='flex items-center gap-2'>
          <span>{row.original.lotLocation.location.code}</span>

          <Badge
            variant='outline'
            className='text-white px-1.5'
            style={{
              backgroundColor: laboratory?.color,
              border: laboratory?.color,
              fontSize: '0.7rem',
            }}
          >
            {laboratory?.name}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'quantity',
    meta: 'Cantidad',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Cantidad' />
    ),
  },
  {
    accessorKey: 'usesPerUnit',
    header: 'U/U',
    cell: ({ row }) => row.original.lotLocation.lot.usesPerUnit,
  },
]
