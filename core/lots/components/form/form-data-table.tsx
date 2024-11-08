'use client'

import { Input } from '@/core/shared/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/shared/ui/table'
import { cn } from '@/core/shared/utils/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Trash } from 'lucide-react'
import { IEditableRowLotLocation } from '../../types'

interface LotLocationDataTableProps {
  data: IEditableRowLotLocation[]
  onDelete(isSaved: boolean, id: number): void
  onQuantityBlur(isSaved: boolean, id: number, quantity: number): void
}

export function LotLocationFormDataTable({
  data,
  onDelete,
  onQuantityBlur,
}: LotLocationDataTableProps) {
  return (
    <div className='rounded-md border overflow-y-auto max-h-64'>
      <Table>
        <TableHeader className='bg-foreground/90'>
          <TableRow className='hover:bg-foreground'>
            <TableHead className='text-center py-2 h-min text-white'>
              Locación
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
                key={item.location.id}
                className={cn(
                  !item.isSaved && 'bg-green-100 hover:bg-green-200',
                  item.toDelete && 'bg-red-100 hover:bg-red-200',
                )}
              >
                <TableCell className='px-0 text-center py-1.5'>
                  {item.location.name}
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
                        onQuantityBlur(item.isSaved, item.location.id, value)
                      }}
                      min={1}
                      className='max-w-12 text-center p-0 mx-0 h-min bg-transparent border-none disabled:opacity-100'
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <div className='flex items-center justify-center'>
                    {item.toDelete ? (
                      <ReloadIcon
                        className='h-4 w-4 cursor-pointer text-blue-600'
                        onClick={() => onDelete(item.isSaved, item.location.id)}
                      />
                    ) : (
                      <Trash
                        className='h-4 w-4 cursor-pointer text-red-600'
                        onClick={() => onDelete(item.isSaved, item.location.id)}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className='h-24 text-center'>
                No hay items disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
