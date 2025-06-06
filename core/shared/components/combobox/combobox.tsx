'use client'

import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/core/shared/utils/utils'
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
import { IOption } from '../../types'
import { useState } from 'react'

interface ComboboxProps {
  options: IOption[]
  value?: number
  selectMessage: string
  onChange: (value?: string) => void
  disabled?: boolean
  className?: string
}

export function Combobox({
  options,
  value,
  selectMessage,
  onChange,
  disabled,
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'w-full justify-between text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          {value
            ? options.find((option) => option.id === value)?.label
            : selectMessage}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className='w-[250px] max-sm:w-[300px] xl:w-[340px] p-0'
        align='start'
      >
        <Command
          filter={(value, search) =>
            value.toLowerCase().trim().includes(search.toLowerCase().trim())
              ? 1
              : 0
          }
        >
          {options.length > 10 && <CommandInput placeholder='Buscar...' />}

          <CommandList>
            <CommandEmpty>No hay opciones disponibles.</CommandEmpty>

            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={`${option.id}`}
                  onSelect={() => {
                    onChange(option.id === value ? undefined : option.label)
                    setOpen(false)
                  }}
                >
                  {option.label}

                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === option.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
