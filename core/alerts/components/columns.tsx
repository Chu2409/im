'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IFullAlert } from '../types'
import { getCategoryConstByLabel } from '@/core/products/data/categories'
import { Badge } from '@/core/shared/ui/badge'
import { formatDate } from '@/core/shared/utils/utils'
import { DataTableRowActions } from './data-table-row-actions'
import { toggleAlertResolved } from '../actions/toggle-alert-resolved'
import { FlagIndicator } from '@/core/shared/components/flag-indicator'
import { getSeverityConstByLabel } from '../data/severities'
import { getTypeConstByLabel } from '../data/types'
import { getLaboratoryConstByLabel } from '@/core/locations/data/labobratories'

export const productsColumns: ColumnDef<IFullAlert>[] = [
  {
    accessorKey: 'id',
    meta: 'Id',
    header: () => <div className='text-center'>ID</div>,
    cell: ({ row }) => <div className='text-center'>{row.original.id}</div>,
  },
  {
    accessorKey: 'product',
    header: 'Producto',
    cell: ({ row }) => {
      const product = row.original.lotLocation.lot.product
      const category = getCategoryConstByLabel(product.category)

      return (
        <div className='flex items-center gap-2'>
          <span>{product.name}</span>

          <Badge
            variant='outline'
            className='text-white px-1.5'
            style={{
              backgroundColor: category?.color,
              border: category?.color,
              fontSize: '0.7rem',
            }}
          >
            {category?.label}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    meta: 'Estado',
    header: '',
    cell: ({ row }) => !row.original.resolved && <FlagIndicator />,
  },
  {
    accessorKey: 'category',
    meta: 'Categoría',
    header: '',
  },
  {
    accessorKey: 'severity',
    header: 'Severidad',
    cell: ({ row }) => {
      const severity = getSeverityConstByLabel(row.original.severity)

      return (
        <Badge
          variant='outline'
          className='text-white'
          style={{
            backgroundColor: severity?.color,
            border: severity?.color,
          }}
        >
          {severity?.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const type = getTypeConstByLabel(row.original.type)

      return (
        <Badge
          variant='outline'
          className='text-white'
          style={{
            backgroundColor: type?.color,
            border: type?.color,
          }}
        >
          {type?.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => row.original.lotLocation.stock,
  },
  {
    accessorKey: 'expiration',
    header: 'Vencimiento',
    cell: ({ row }) => (
      <span className='capitalize'>
        {row.original.lotLocation.lot.expirationDate
          ? formatDate(row.original.lotLocation.lot.expirationDate)
          : 'N/A'}
      </span>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Locación',
    cell: ({ row }) => {
      const location = row.original.lotLocation.location
      const laboratory = getLaboratoryConstByLabel(location.laboratory)

      return (
        <div className='flex items-center gap-1.5 text-xs'>
          <span>
            {location.name} - {location.code}
          </span>

          <Badge
            variant='outline'
            className='text-white px-1.5'
            style={{
              backgroundColor: laboratory?.color,
              border: laboratory?.color,
              fontSize: '0.7rem',
            }}
          >
            {laboratory?.label}
          </Badge>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const toggleStatus = async (id: number, status: boolean) => {
        const { data: deleted } = await toggleAlertResolved(id, status)

        return deleted
      }

      return (
        <DataTableRowActions
          id={row.original.id}
          resolved={row.original.resolved}
          toggleResolved={toggleStatus}
        />
      )
    },
  },
]
