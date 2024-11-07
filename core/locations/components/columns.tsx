'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/test/data-table-column-header'
import { DataTableRowActions } from '@/core/shared/components/table/data-table-row-actions'
import { Location } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { toggleLocationStatus } from '../actions/toggle-location-status'
import { useLocationModal } from '../hooks/use-location-modal'
import { Badge } from '@/core/shared/ui/badge'
import { getLaboratoryByName } from '../data/labobratories'
import { FlagIndicator } from '@/core/shared/components/flag-indicator'

export const locationColumns: ColumnDef<Location>[] = [
  {
    accessorKey: 'id',
    meta: 'Id',
    header: () => <div className='text-center'>ID</div>,
    cell: ({ row }) => <div className='text-center'>{row.original.id}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'status',
    meta: 'Estado',
    header: '',
    cell: ({ row }) => !row.original.active && <FlagIndicator />,
  },
  {
    accessorKey: 'code',
    header: 'Código',
  },
  {
    accessorKey: 'laboratory',
    meta: 'Laboratorio',
    header: () => (
      <DataTableColumnHeader sort='laboratory' title='Laboratorio' />
    ),
    cell: ({ row }) => {
      const laboratory = getLaboratoryByName(row.original.laboratory)

      return (
        <Badge
          variant='outline'
          className='text-white'
          style={{
            backgroundColor: laboratory?.color,
            border: laboratory?.color,
          }}
        >
          {laboratory?.name}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const onOpen = useLocationModal((state) => state.onOpen)

      const toggleStatus = async (id: number, status: boolean) => {
        const { data: deleted } = await toggleLocationStatus(id, status)

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
