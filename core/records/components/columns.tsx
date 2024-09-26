'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'
import { formatDate } from '@/lib/utils'
import { Record } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

export const recordsColumns: ColumnDef<Record>[] = [
  {
    accessorKey: 'date',
    meta: 'Fecha',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fecha' />
    ),
    cell: ({ cell }) => (
      <span className='capitalize'>{formatDate(cell.getValue() as Date)}</span>
    ),
  },
]
