'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'
import { formatDate } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { useRecord } from '../hooks/use-record'
import { IRecordWithItems } from '../types'
import { EyeOpenIcon } from '@radix-ui/react-icons'

export const recordsColumns: ColumnDef<IRecordWithItems>[] = [
  {
    accessorKey: 'date',
    meta: 'Fecha',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fecha' />
    ),
    cell: ({ cell, row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const setRecord = useRecord((state) => state.setRecord)

      return (
        <div
          className='capitalize cursor-pointer w-full h-full flex justify-between items-center'
          onClick={() => setRecord(row.original)}
        >
          {formatDate(cell.getValue() as Date)}

          <EyeOpenIcon />
        </div>
      )
    },
  },
]
