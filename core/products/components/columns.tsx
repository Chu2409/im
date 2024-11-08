'use client'

import { DataTableColumnHeader } from '@/core/shared/components/table/paginated/data-table-column-header'
import { DataTableRowActions } from '@/core/shared/components/table/data-table-row-actions'
import { ColumnDef } from '@tanstack/react-table'
import { useProductModal } from '../hooks/use-product-modal'
import { Badge } from '@/core/shared/ui/badge'
import { getCategoryConstByLabel } from '../data/categories'
import { FlagIndicator } from '@/core/shared/components/flag-indicator'
import { toggleProductStatus } from '../actions/toggle-product-status'
import { Product } from '@prisma/client'

export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    meta: 'Id',
    header: () => <div className='text-center'>ID</div>,
    cell: ({ row }) => <div className='text-center'>{row.original.id}</div>,
  },
  {
    accessorKey: 'name',
    meta: 'Nombre',
    header: () => <DataTableColumnHeader title='Nombre' sort='name' />,
  },
  {
    accessorKey: 'status',
    meta: 'Estado',
    header: '',
    cell: ({ row }) => !row.original.active && <FlagIndicator />,
  },
  {
    accessorKey: 'category',
    meta: 'Categoría',
    header: () => <DataTableColumnHeader title='Categoría' sort='category' />,
    filterFn: (row, id, filterValue) => {
      const category = getCategoryConstByLabel(row.original.category)
      return filterValue.includes(category?.id)
    },
    cell: ({ row }) => {
      const category = getCategoryConstByLabel(row.original.category)

      return (
        <Badge
          variant='outline'
          className='text-white'
          style={{
            backgroundColor: category?.color,
            border: category?.color,
          }}
        >
          {category?.label}
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
