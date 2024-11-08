import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'

import { cn } from '@/core/shared/utils/utils'
import { Badge } from '@/core/shared/ui/badge'
import { Button } from '@/core/shared/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/core/shared/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/core/shared/ui/popover'
import { Separator } from '@/core/shared/ui/separator'
import { IOption } from '@/core/shared/types'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  formUrlArrayQuery,
  removeValueFromArrayQuery,
} from '@/core/shared/utils/pagination'

interface DataTableFacetedFilterProps {
  paramKey: string
  title?: string
  options: IOption[]
  getById: (id: number) => IOption | undefined
}

export function DataTableFacetedFilter({
  paramKey,
  title,
  options,
  getById,
}: DataTableFacetedFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.getAll(paramKey)

  const selected = status
    .map((status) => getById(Number(status))?.id)
    .filter((status) => status != null)

  const handleChange = (value: number, isSelected: boolean) => {
    let url
    if (isSelected)
      url = removeValueFromArrayQuery({
        params: searchParams,
        keyToRemove: paramKey,
        valueToRemove: value.toString(),
      })
    else
      url = formUrlArrayQuery({
        params: searchParams,
        key: paramKey,
        value: value.toString(),
      })

    router.push(url, { scroll: false })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8'>
          <PlusCircledIcon className='mr-2 h-4 w-4' />

          {title}

          {selected?.length > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />

              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selected.length}
              </Badge>

              <div className='hidden space-x-1 lg:flex'>
                {selected.length > 2 ? (
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal'
                  >
                    {selected.length} seleccionados
                  </Badge>
                ) : (
                  options
                    .filter((option) => selected.includes(option.id))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.id}
                        className='rounded-sm px-1 font-normal'
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[180px] p-0' align='start'>
        <Command>
          {options.length > 10 && <CommandInput placeholder={title} />}

          <CommandList>
            <CommandEmpty>No hay opciones disponibles</CommandEmpty>

            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.includes(option.id)

                return (
                  <CommandItem
                    key={option.id}
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
