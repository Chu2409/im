'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'
import { formatDate } from '@/core/shared/utils/utils'
import { ColumnDef } from '@tanstack/react-table'
import { useRecord } from '../hooks/use-record'
import { IRecordWithItems } from '../types'
import { useRecordModal } from '../hooks/use-record-modal'
import { deleteRecord } from '../actions/delete-record'
import { DataTableRowActions } from '../../shared/components/table/data-table-row-actions-delete'

export const recordsColumns: ColumnDef<IRecordWithItems>[] = [
  {
    accessorKey: 'id',
    meta: 'Id',
    header: () => <div className='text-center'>ID</div>,
    cell: ({ row }) => <div className='text-center'>{row.original.id}</div>,
  },
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
    sortingFn: (rowA, rowB) =>
      new Date(rowA.original.start).getTime() -
      new Date(rowB.original.start).getTime(),
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
        const { data: deleted } = await deleteRecord(id)

        return deleted || false
      }

      return (
        <DataTableRowActions
          id={row.original.id}
          onDelete={onDelete}
          deleteMessage='El registro ha sido eliminado correctamente'
          errorMessage='Elimine los items del registro primero'
          onEdit={handleClick}
        />
      )
    },
  },
]
