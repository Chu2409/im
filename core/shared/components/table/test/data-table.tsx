'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/shared/ui/table'
import { DataTableToolbar } from './data-table-toolbar'
import { DataTablePagination } from './data-table-pagination'
import { useEffect } from 'react'
import { IFilter } from './types'
import { IPaginatedRes } from '@/core/shared/types/pagination'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: IPaginatedRes<TData> | undefined
  inputFilterKey?: string
  filters?: IFilter[]
  enableViewOptions?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  inputFilterKey,
  filters,
  enableViewOptions = true,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    table.setPageSize(data?.metadata.size || 10)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className='space-y-4'>
      <DataTableToolbar
        table={table}
        filters={filters}
        inputFilterKey={inputFilterKey}
        enableViewOptions={enableViewOptions}
      />

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination metadata={data?.metadata} />
    </div>
  )
}
