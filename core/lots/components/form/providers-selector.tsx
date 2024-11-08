'use client'

import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/core/shared/utils/utils'
import { Button } from '@/core/shared/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/core/shared/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/core/shared/ui/popover'
import { useCallback, useEffect, useState } from 'react'
import debounce from 'just-debounce-it'
import { Provider } from '@prisma/client'
import { Input } from '@/core/shared/ui/input'
import { getProvidersToForm } from '@/core/providers/actions/get-providers-to-form'

interface ProvidersSelectorProps {
  value?: Provider
  onChange: (provider?: Provider) => void
  disabled?: boolean
}

export function ProvidersSelector({
  value,
  onChange,
  disabled,
}: ProvidersSelectorProps) {
  const [open, setOpen] = useState(false)

  const [providers, setProviders] = useState<Provider[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>(inputValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setInputValue(value)
    debouncedValue(value)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedValue = useCallback(
    debounce((value: string) => {
      setSearchValue(value)
    }, 500),
    [],
  )

  useEffect(() => {
    if (searchValue === '') {
      setProviders([])
      return
    }

    const fetchData = async () => {
      const { data = [] } = await getProvidersToForm(searchValue)

      setProviders(data)
    }

    fetchData()
  }, [searchValue])

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
          )}
        >
          {value?.name || 'Seleccione un proveedor'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className='p-0 -mt-1 w-[300px] sm:w-[250px] md:w-[280px] lg:w-[340px] xl:w-[400px]'
        align='start'
      >
        <Command className='shadow-md'>
          <Input
            placeholder='Ingrese el nombre del proveedor...'
            className='mb-1'
            onChange={handleChange}
            value={inputValue}
          />

          <CommandList>
            <CommandEmpty>No hay proveedores disponibles</CommandEmpty>

            <CommandGroup>
              {providers.map((provider) => (
                <CommandItem
                  key={`${provider.id}`}
                  onSelect={() => {
                    onChange(provider.id === value?.id ? undefined : provider)
                    setOpen(false)
                  }}
                >
                  {provider.name}

                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value?.id === provider.id ? 'opacity-100' : 'opacity-0',
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
