'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ui/command'
import { Label } from '@/ui/label'
import { Product } from '@prisma/client'

export const ProductsSelector = ({
  products,
  onAdd,
}: {
  products: Product[]
  onAdd: (id: number) => void
}) => {
  return (
    <div className='space-y-2'>
      <Label className=''>Inventario disponible</Label>

      <Command
        className='rounded-lg border shadow-md'
        filter={(value, search) => {
          if (value.toLowerCase().includes(search.toLowerCase())) return 1

          return 0
        }}
      >
        <CommandInput placeholder='Buscar producto...' />

        <CommandList>
          <CommandEmpty>Producto no encontrado</CommandEmpty>

          <CommandGroup className='overflow-y-auto max-h-[500px]'>
            {products.map((product) => (
              <CommandItem
                key={product.name}
                value={product.name}
                onSelect={() => {
                  onAdd(product.id)
                }}
                className='cursor-pointer'
              >
                {product.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
