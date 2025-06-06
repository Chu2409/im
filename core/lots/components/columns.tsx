'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IFullLot } from '../types'
import { getCategoryConstByLabel } from '@/core/products/data/categories'
import { Badge } from '@/core/shared/ui/badge'
import { formatDate } from '@/core/shared/utils/utils'
import { DataTableColumnHeader } from '@/core/shared/components/table/paginated/data-table-column-header'
import { DataTableRowActions } from '@/core/shared/components/table/data-table-row-actions-delete'
import { useLotModal } from '../hooks/use-lot-modal'
import { deleteLot } from '../actions/delete-lot'
import { getLaboratoryConstByLabel } from '@/core/locations/data/labobratories'

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
      const category = getCategoryConstByLabel(row.original.product.category)

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
            {category?.label}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'category',
    meta: 'Categoría',
    header: '',
  },
  {
    accessorKey: 'quantity',
    header: 'Adquirido',
    cell: ({ row }) => row.original.quantityPurchased,
  },
  {
    accessorKey: 'usesPerUnit',
    header: 'U/U',
  },
  {
    accessorKey: 'maxUses',
    header: 'U/M',
    cell: ({ row }) =>
      row.original.quantityPurchased * row.original.usesPerUnit,
  },
  {
    accessorKey: 'orderDate',
    meta: 'Orden',
    header: () => <DataTableColumnHeader sort='orderDate' title='Orden' />,
    cell: ({ row }) => (
      <span className='capitalize'>{formatDate(row.original.orderDate)}</span>
    ),
  },
  {
    accessorKey: 'expiration',
    meta: 'Vencimiento',
    header: () => (
      <DataTableColumnHeader sort='expirationDate' title='Vencimiento' />
    ),
    cell: ({ row }) => (
      <span className='capitalize'>
        {row.original.expirationDate
          ? formatDate(row.original.expirationDate)
          : 'N/A'}
      </span>
    ),
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => (
      <div className='flex flex-col gap-1.5 justify-center'>
        {row.original.lotLocations.map((lotLocation) => {
          const laboratory = getLaboratoryConstByLabel(
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
                {laboratory?.label}
              </Badge>

              <Badge
                variant='outline'
                className='rounded-full px-1.5 font-normal'
              >
                {lotLocation.stock}
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
        const { data: deleted } = await deleteLot(id)
        return deleted || false
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
