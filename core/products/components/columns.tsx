'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'
import { DataTableRowActions } from '@/core/shared/components/table/data-table-row-actions'
import { ColumnDef } from '@tanstack/react-table'
import { useProductModal } from '../hooks/use-product-modal'
import { Badge } from '@/core/shared/ui/badge'
import { getCategoryByName } from '../data/categories'
import { FlagIndicator } from '@/core/shared/components/flag-indicator'
import { toggleProductStatus } from '../actions/toggle-product-status'
import { Product } from '@prisma/client'

export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    meta: 'Nombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    ),
  },
  {
    accessorKey: 'status',
    meta: 'Estado',
    header: '',
    cell: ({ row }) => !row.original.active && <FlagIndicator />,
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
    id: 'actions',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const onOpen = useProductModal((state) => state.onOpen)

      const toggleStatus = async (id: number, status: boolean) => {
        const { data: deleted } = await toggleProductStatus(id, status)

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
