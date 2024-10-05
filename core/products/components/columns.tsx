'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'
import { DataTableRowActions } from '@/core/shared/components/table/data-table-row-actions'
import { ColumnDef } from '@tanstack/react-table'
import { IProductWithProviders } from '../types'
import { useProductModal } from '../hooks/use-product-modal'
import { Badge } from '@/ui/badge'
import { getCategoryByName } from '../data/categories'
import { InactiveIndicator } from '@/core/shared/components/inactive-indicator'

export const productsColumns: ColumnDef<IProductWithProviders>[] = [
  {
    accessorKey: 'name',
    meta: 'Nombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre' toggleVisibility />
    ),
  },
  {
    accessorKey: 'status',
    meta: 'Estado',
    header: '',
    cell: ({ row }) => !row.original.active && <InactiveIndicator />,
    filterFn: (row, id, filterValue) => {
      const value = row.original.active ? 1 : 0
      return filterValue.includes(value)
    },
  },
  {
    accessorKey: 'category',
    meta: 'Categoría',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Categoría'
        toggleVisibility
      />
    ),
    filterFn: (row, id, filterValue) => {
      const category = getCategoryByName(row.original.category)
      return filterValue.includes(category?.id)
    },
    cell: ({ row }) => {
      const category = getCategoryByName(row.original.category)

      return (
        <Badge
          variant='outline'
          className='text-white'
          style={{
            backgroundColor: category?.color,
            border: category?.color,
          }}
        >
          {category?.name}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'providers',
    header: 'Proveedores',
    cell: ({ row }) => (
      <div className='flex items-center h-full w-full gap-2 flex-wrap'>
        {row.original.productsProviders.map((productProvider) => (
          <Badge
            key={`${productProvider.id}-${productProvider.productId}-${productProvider.providerId}`}
            className='rounded-full'
            variant='outline'
          >
            {productProvider.provider?.name}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const onOpen = useProductModal((state) => state.onOpen)

      return (
        <DataTableRowActions
          id={row.original.id}
          status={row.original.active}
          toggleStatus={() => Promise.resolve(true)}
          onEdit={() => onOpen(row.original)}
        />
      )
    },
  },
]
