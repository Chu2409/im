'use client'

import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'

import { cn } from '@/core/shared/utils/utils'
import { Badge } from '@/core/shared/ui/badge'
import { Button } from '@/core/shared/ui/button'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/core/shared/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/core/shared/ui/popover'
import { Separator } from '@/core/shared/ui/separator'
import { status } from '../../data/status-options'
import { useEffect } from 'react'

interface DataTableStatusFilterProps<TData, TValue> {
  column: Column<TData, TValue>
}

export function DataTableStatusFilter<TData, TValue>({
  column,
}: DataTableStatusFilterProps<TData, TValue>) {
  const selectedValues = new Set(column?.getFilterValue() as number[])

  useEffect(() => {
    column.setFilterValue([1])
  }, [column])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8'>
          <PlusCircledIcon className='mr-2 h-4 w-4' />
          Estado
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />

              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selectedValues.size}
              </Badge>

              <div className='hidden space-x-1 lg:flex'>
                {status
                  .filter((option) => selectedValues.has(option.value))
                  .map((option) => (
                    <Badge
                      variant='secondary'
                      key={option.label}
                      className='rounded-sm px-1 font-normal'
                    >
                      {option.label}
                    </Badge>
                  ))}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[180px] p-0' align='start'>
        <Command>
          <CommandList>
            <CommandGroup>
              {status.map((option) => {
                const isSelected = selectedValues.has(option.value)

                return (
                  <CommandItem
                    key={option.label}
                    onSelect={() => {
                      if (isSelected) selectedValues.delete(option.value)
                      else selectedValues.add(option.value)

                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      )
                    }}
                    className='cursor-pointer capitalize'
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>

                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
