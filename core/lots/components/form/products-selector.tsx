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
import { Product } from '@prisma/client'
import { Input } from '@/core/shared/ui/input'
import { getProductsToForm } from '@/core/products/actions/get-products-to-form'

interface ProductsSelectorProps {
  value?: Product
  onChange: (product?: Product) => void
  disabled?: boolean
}

export function ProductsSelector({
  value,
  onChange,
  disabled,
}: ProductsSelectorProps) {
  const [open, setOpen] = useState(false)

  const [products, setProducts] = useState<Product[]>([])
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
      setProducts([])
      return
    }

    const fetchData = async () => {
      const { data = [] } = await getProductsToForm(searchValue)

      setProducts(data)
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
          {value?.name || 'Seleccione un producto'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className='p-0 -mt-1 w-[300px] sm:w-[250px] md:w-[280px] lg:w-[340px] xl:w-[400px]'
        align='start'
      >
        <Command className='shadow-md'>
          <Input
            placeholder='Ingrese el nombre del producto...'
            className='mb-1'
            onChange={handleChange}
            value={inputValue}
          />

          <CommandList>
            <CommandEmpty>No hay productos disponibles</CommandEmpty>

            <CommandGroup>
              {products.map((product) => (
                <CommandItem
                  key={`${product.id}`}
                  onSelect={() => {
                    onChange(product.id === value?.id ? undefined : product)
                    setOpen(false)
                  }}
                >
                  {product.name}

                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value?.id === product.id ? 'opacity-100' : 'opacity-0',
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
