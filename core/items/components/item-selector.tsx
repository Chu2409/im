'use client'

import { IFullLotLocation } from '@/core/lots/types'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ui/command'
import { Label } from '@/ui/label'

export const ItemSelector = ({
  lotLocations,
  onAdd,
}: {
  lotLocations: IFullLotLocation[]
  onAdd: (id: number) => void
}) => {
  return (
    <div className='space-y-2'>
      <Label>Inventario disponible</Label>

      <Command
        className='rounded-lg border shadow-md'
        filter={(value, search) => {
          const name = value.split('@')[1]

          if (name.toLowerCase().trim().includes(search.toLowerCase().trim()))
            return 1

          return 0
        }}
      >
        <CommandInput placeholder='Buscar producto...' />

        <CommandList>
          <CommandEmpty>Producto no encontrado</CommandEmpty>

          <CommandGroup className='overflow-y-auto max-h-40'>
            <div className='w-full font-light text-sm text-muted-foreground px-2 grid-cols-5 grid gap-2 text-center'>
              <span className='col-span-2'>Producto</span>

              <span>Lote</span>

              <span>Ubicación</span>

              <span>Stock</span>
            </div>

            {lotLocations.map((lotLocation) => (
              <CommandItem
                key={lotLocation.id}
                value={`${lotLocation.id}@${lotLocation.lot.product.name}`}
                onSelect={() => {
                  onAdd(lotLocation.id)
                }}
                className='cursor-pointer gap-2 grid grid-cols-5 text-center'
              >
                <span className='col-span-2'>
                  {lotLocation.lot.product.name}
                </span>

                <span>{lotLocation.lotId}</span>

                <span>{lotLocation.location.laboratory}</span>

                <span>{lotLocation.quantity}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
