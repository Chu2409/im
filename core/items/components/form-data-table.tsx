'use client'

import { Input } from '@/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table'
import { cn } from '@/lib/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Trash } from 'lucide-react'
import { IEditableRowItem } from '../types'

interface ItemFormDataTableProps {
  data: IEditableRowItem[]
  onDelete(isSaved: boolean, id: number): void
  onQuantityBlur(isSaved: boolean, id: number, quantiy: number): void
}

export function ItemFormDataTable({
  data,
  onDelete,
  onQuantityBlur,
}: ItemFormDataTableProps) {
  return (
    <div className='rounded-md border overflow-y-auto h-64'>
      <Table>
        <TableHeader className='bg-foreground/90'>
          <TableRow className='hover:bg-foreground'>
            <TableHead className='text-center py-2 h-min text-white'>
              Lote
            </TableHead>

            <TableHead className='text-center py-2 h-min text-white'>
              Nombre
            </TableHead>

            <TableHead className='text-center py-2 h-min text-white'>
              Ubicación
            </TableHead>

            <TableHead className='text-center py-2 h-min text-white'>
              Cantidad
            </TableHead>

            {data.length > 0 && (
              <TableHead className='text-center py-2 h-min text-white' />
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow
                key={item.lotLocation.id}
                className={cn(
                  !item.isSaved && 'bg-green-100 hover:bg-green-200',
                  item.toDelete && 'bg-red-100 hover:bg-red-200',
                )}
              >
                <TableCell className='px-0 text-center py-1.5'>
                  {item.lotLocation.lotId}
                </TableCell>

                <TableCell className='px-0 text-center py-1.5'>
                  {item.lotLocation.productName}
                </TableCell>

                <TableCell className='px-0 text-center py-1.5'>
                  {item.lotLocation.laboratory}
                </TableCell>

                <TableCell
                  className={cn(
                    'px-0 text-center py-1.5',
                    item.quantity.isEdited && 'bg-blue-200',
                  )}
                >
                  <div className='w-full flex items-center justify-center'>
                    <Input
                      type='number'
                      defaultValue={item.quantity.value}
                      disabled={item.toDelete}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        if (value < 0) return
                        onQuantityBlur(item.isSaved, item.lotLocation.id, value)
                      }}
                      min={1}
                      max={
                        item.toEdit.oldQuantity + item.lotLocation.maxQuantity
                      }
                      className='max-w-12 text-center p-0 mx-0 h-min bg-transparent border-none disabled:opacity-100'
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <div className='flex items-center justify-center'>
                    {item.toDelete ? (
                      <ReloadIcon
                        className='h-4 w-4 cursor-pointer text-blue-600'
                        onClick={() =>
                          onDelete(item.isSaved, item.lotLocation.id)
                        }
                      />
                    ) : (
                      <Trash
                        className='h-4 w-4 cursor-pointer text-red-600'
                        onClick={() =>
                          onDelete(item.isSaved, item.lotLocation.id)
                        }
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className='h-24 text-center'>
                No hay items disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
