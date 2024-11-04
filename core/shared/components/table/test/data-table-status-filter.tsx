'use client'

import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'

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
import { STATUSES, getEstatusById } from '@/core/shared/data/statuses'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  formUrlQueryArray,
  removeKeyFromArrayQuery,
} from '@/core/shared/utils/pagination'

export const DataTableStatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.getAll('status')

  const selected = status
    .map((status) => getEstatusById(Number(status))?.id)
    .filter((status) => status != null)

  const handleChange = (value: number, isSelected: boolean) => {
    let url
    if (isSelected)
      url = removeKeyFromArrayQuery({
        params: searchParams,
        keyToRemove: 'status',
        valueToRemove: value.toString(),
      })
    else
      url = formUrlQueryArray({
        params: searchParams,
        key: 'status',
        value: value.toString(),
      })

    router.push(url, { scroll: false })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8'>
          <PlusCircledIcon className='mr-2 h-4 w-4' />
          Estado
          {selected.length > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />

              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selected.length}
              </Badge>

              <div className='hidden space-x-1 lg:flex'>
                {Object.values(STATUSES)
                  .filter((option) => selected.includes(option.id))
                  .map((option) => (
                    <Badge
                      variant='secondary'
                      key={option.id}
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
              {Object.values(STATUSES).map((option) => {
                const isSelected = selected.includes(option.id)

                return (
                  <CommandItem
                    key={option.label}
                    onSelect={() => handleChange(option.id, isSelected)}
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
