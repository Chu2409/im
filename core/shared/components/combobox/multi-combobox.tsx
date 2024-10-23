import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { Separator } from '@/ui/separator'
import { cn } from '@/lib/utils'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { CheckIcon } from 'lucide-react'
import { IOption } from '../../types'

interface MultiComboboxProps {
  title: string
  values: number[]
  options: IOption[]
  onChange: (value: number) => void
  onRemove: (value: number) => void
  disabled?: boolean
}

export const MultiCombobox: React.FC<MultiComboboxProps> = ({
  title,
  values,
  options,
  onChange,
  onRemove,
  disabled,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant='outline'
          className='h-9 bg-white border border-black border-opacity-20 w-full flex items-center justify-start gap-2 text-stone-500 font-normal'
        >
          <PlusCircledIcon className='h-4 w-4' />

          {title}

          {values?.length > 0 && (
            <div className='ml-auto flex items-center'>
              <Separator orientation='vertical' className='mx-2 h-4' />

              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal text-stone-500'
              >
                {values.length}
              </Badge>
            </div>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='p-0 bg-white w-[200px]' align='start'>
        <Command>
          {options.length > 10 && <CommandInput placeholder='Buscar...' />}

          <CommandList>
            <CommandEmpty>No hay opciones disponibles</CommandEmpty>

            <CommandGroup>
              {options.map((option) => {
                const isSelected = values.includes(option.value)
                return (
                  <CommandItem
                    key={`${option.value}`}
                    onSelect={() => {
                      if (isSelected) onRemove(option.value)
                      else onChange(option.value)
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
