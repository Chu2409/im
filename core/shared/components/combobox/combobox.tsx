'use client'

import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
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
import { IOption } from '../../types'
import { useState } from 'react'

interface ComboboxProps {
  options: IOption[]
  value?: number
  selectMessage: string
  onChange: (value?: number) => void
  disabled?: boolean
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  selectMessage,
  onChange,
  disabled,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : selectMessage}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[200px] p-0'>
        <Command>
          {options.length > 10 && <CommandInput placeholder='Buscar...' />}

          <CommandList>
            <CommandEmpty>No hay opciones disponibles.</CommandEmpty>

            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(option.value === value ? undefined : option.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
