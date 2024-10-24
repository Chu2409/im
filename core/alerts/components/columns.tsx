'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IFullAlert } from '../types'
import { getCategoryByName } from '@/core/products/data/categories'
import { Badge } from '@/ui/badge'
import { getTypeByName } from '../data/types'
import { getSeverityByName } from '../data/severities'
import { getLaboratoryByName } from '@/core/locations/data/labobratories'
import { formatDate } from '@/lib/utils'

export const productsColumns: ColumnDef<IFullAlert>[] = [
  {
    accessorKey: 'product',
    header: 'Producto',
    cell: ({ row }) => {
      const product = row.original.lotLocation.lot.product
      const category = getCategoryByName(product.category)

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
            {category?.name}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, filterValue) =>
      row.original.lotLocation.lot.product.name
        .toLowerCase()
        .trim()
        .includes(filterValue.toLowerCase().trim()),
  },
  {
    accessorKey: 'category',
    meta: 'Categoría',
    header: '',
    filterFn: (row, id, filterValue) => {
      const category = getCategoryByName(
        row.original.lotLocation.lot.product.category,
      )
      return filterValue.includes(category?.id)
    },
  },
  {
    accessorKey: 'severity',
    header: 'Severidad',
    cell: ({ row }) => {
      const severity = getSeverityByName(row.original.severity)

      return (
        <Badge
          variant='outline'
          className='text-white'
          style={{
            backgroundColor: severity?.color,
            border: severity?.color,
          }}
        >
          {severity?.name}
        </Badge>
      )
    },
    filterFn: (row, id, filterValue) => {
      const severity = getSeverityByName(row.original.severity)
      return filterValue.includes(severity?.id)
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const type = getTypeByName(row.original.type)

      return (
        <Badge
          variant='outline'
          className='text-white'
          style={{
            backgroundColor: type?.color,
            border: type?.color,
          }}
        >
          {type?.name}
        </Badge>
      )
    },
    filterFn: (row, id, filterValue) => {
      const type = getTypeByName(row.original.type)
      return filterValue.includes(type?.id)
    },
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => row.original.lotLocation.quantity,
  },
  {
    accessorKey: 'expiration',
    header: 'Vencimiento',
    sortingFn: (rowA, rowB) =>
      new Date(rowA.original.lotLocation.lot.expirationDate).getTime() -
      new Date(rowB.original.lotLocation.lot.expirationDate).getTime(),
    cell: ({ row }) => (
      <span className='capitalize'>
        {formatDate(row.original.lotLocation.lot.expirationDate)}
      </span>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Locación',
    cell: ({ row }) => {
      const location = row.original.lotLocation.location
      const laboratory = getLaboratoryByName(location.laboratory)

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
            {laboratory?.name}
          </Badge>
        </div>
      )
    },
  },
]
