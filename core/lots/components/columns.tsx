'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IFullLot } from '../types'
import { getCategoryByName } from '@/core/products/data/categories'
import { Badge } from '@/ui/badge'
import { formatDate } from '@/lib/utils'
import { getLaboratoryByName } from '@/core/locations/data/labobratories'
import { DataTableColumnHeader } from '@/core/shared/components/table/data-table-column-header'
import { DataTableRowActions } from '@/core/shared/components/table/data-table-row-actions-delete'
import { useLotModal } from '../hooks/use-lot-modal'
import { deleteLot } from '../actions/delete-lot'

export const lotColumns: ColumnDef<IFullLot>[] = [
  {
    accessorKey: 'lot',
    meta: 'Lote',
    header: () => <div className='text-center'>Lote</div>,
    cell: ({ row }) => <div className='text-center'>{row.original.id}</div>,
  },
  {
    accessorKey: 'product',
    header: 'Producto',
    cell: ({ row }) => {
      const category = getCategoryByName(row.original.product.category)

      return (
        <div className='flex items-center gap-2'>
          <span>{row.original.product.name}</span>

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
      row.original.product.name
        .toLowerCase()
        .trim()
        .includes(filterValue.toLowerCase().trim()),
  },
  {
    accessorKey: 'category',
    meta: 'Categoría',
    header: '',
    filterFn: (row, id, filterValue) => {
      const category = getCategoryByName(row.original.product.category)
      return filterValue.includes(category?.id)
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Adquirido',
    cell: ({ row }) => row.original.quantityPurchased,
  },
  {
    accessorKey: 'usesPerUnit',
    header: 'Usos por unidad',
  },
  {
    accessorKey: 'expiration',
    meta: 'Vencimiento',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Vencimiento'
        toggleVisibility
      />
    ),
    sortingFn: (rowA, rowB) =>
      new Date(rowA.original.expirationDate).getTime() -
      new Date(rowB.original.expirationDate).getTime(),
    cell: ({ row }) => (
      <span className='capitalize'>
        {formatDate(row.original.expirationDate)}
      </span>
    ),
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => (
      <div className='flex flex-col gap-1.5 justify-center'>
        {row.original.lotLocations.map((lotLocation) => {
          const laboratory = getLaboratoryByName(
            lotLocation.location.laboratory,
          )

          return (
            <div
              key={lotLocation.id}
              className='flex items-center gap-1.5 text-xs'
            >
              <span>
                {lotLocation.location.name} - {lotLocation.location.code}
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

              <Badge
                variant='outline'
                className='rounded-full px-1.5 font-normal'
              >
                {lotLocation.quantity}
              </Badge>
            </div>
          )
        })}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const onOpen = useLotModal((state) => state.onOpen)

      const onDelete = async (id: number) => {
        return await deleteLot(id)
      }

      return (
        <DataTableRowActions
          id={row.original.id}
          onDelete={onDelete}
          deleteMessage='El lote ha sido eliminado correctamente'
          errorMessage='El lote ya contiene registros asociados'
          onEdit={() => onOpen(row.original)}
        />
      )
    },
  },
]
