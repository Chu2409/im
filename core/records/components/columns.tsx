'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'
import { formatDate } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { useRecord } from '../hooks/use-record'
import { IRecordWithItems } from '../types'
import { useRecordModal } from '../hooks/use-record-modal'
import { DataTableRowActions } from '@/core/shared/components/table/data-table-row-actions'
import { deleteRecord } from '../actions/delete-record'

export const recordsColumns: ColumnDef<IRecordWithItems>[] = [
  {
    accessorKey: 'date',
    meta: 'Fecha',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fecha' />
    ),
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const setRecord = useRecord((state) => state.setRecord)

      return (
        <div
          className='capitalize cursor-pointer w-full h-full py-0.5'
          onClick={() => setRecord(row.original)}
        >
          {formatDate(row.original.start)} - {formatDate(row.original.end)}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const onOpen = useRecordModal((state) => state.onOpen)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const setRecord = useRecord((state) => state.setRecord)

      const handleClick = () => {
        setRecord(row.original)
        onOpen()
      }

      const onDelete = async (id: number) => {
        setRecord(undefined)
        return await deleteRecord(id)
      }

      return (
        <DataTableRowActions
          id={row.original.id}
          toggleStatus={onDelete}
          toggleStatusMessage='El registro ha sido eliminado correctamente'
          errorMessage='Elimine los items del registro primero'
          onEdit={handleClick}
        />
      )
    },
  },
]
