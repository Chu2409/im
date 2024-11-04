'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/core/shared/ui/button'
import { Input } from '@/core/shared/ui/input'

import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { IFilter } from './types'
import { DataTableViewOptions } from './data-table-view-options'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'
import { formUrlQuery } from '@/core/shared/utils/pagination'
import debounce from 'debounce'
import { DataTableStatusFilter } from './data-table-status-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  inputFilterKey?: string
  filters?: IFilter[]
  statusColumn: boolean
  viewOptions: boolean
}

export function DataTableToolbar<TData>({
  table,
  inputFilterKey,
  filters,
  statusColumn,
  viewOptions,
}: DataTableToolbarProps<TData>) {
  const inputColumn = inputFilterKey ? table.getColumn(inputFilterKey) : null

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    applyFilter(value)
  }

  const applyFilter = debounce((value: string) => {
    const url = formUrlQuery({
      params: searchParams,
      key: 'search',
      value,
    })

    router.push(url, { scroll: false })
  }, 500)

  const handleClearFilters = () => {
    router.push(pathName, { scroll: false })
  }

  return (
    <div className='flex items-center justify-between gap-2 flex-wrap'>
      {(inputFilterKey || (filters && filters.length > 0)) && (
        <div className='flex items-center gap-2 flex-wrap'>
          {inputColumn && (
            <Input
              placeholder={`Filtrar por ${((inputColumn.columnDef.meta as string) || (inputColumn.columnDef.header as string)).toLowerCase()}...`}
              onChange={handleChange}
              className='h-8 w-[200px] lg:w-[250px] '
            />
          )}

          {filters?.map((filter) => {
            const column = table.getColumn(filter.key)

            return (
              <DataTableFacetedFilter
                key={filter.key}
                column={column}
                title={
                  (column?.columnDef.meta as string) ||
                  (column?.columnDef.header as string)
                }
                options={filter.values}
              />
            )
          })}

          {statusColumn && <DataTableStatusFilter />}

          {searchParams.size > 0 && (
            <Button
              variant='ghost'
              onClick={() => handleClearFilters()}
              className='h-8 px-2 lg:px-3 bg-gray-200 hover:bg-gray-300 text-black'
            >
              Limpiar filtros
              <Cross2Icon className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
      )}

      {viewOptions && table.getAllColumns().length > 2 && (
        <DataTableViewOptions table={table} />
      )}
    </div>
  )
}
