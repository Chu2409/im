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
  values,
}: {
  lotLocations: IFullLotLocation[]
  onAdd: (id: number) => void
  values: string[]
}) => {
  return (
    <>
      <Label>Inventario disponible</Label>

      <Command
        className='border shadow-md -pb-2'
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

          <CommandGroup className='overflow-y-auto max-h-52 p-0 m-0'>
            {lotLocations.length > 0 && (
              <div className='w-full text-sm font-medium px-2 grid-cols-5 grid gap-2 text-center'>
                <span>Lote</span>

                <span className='col-span-2'>Nombre</span>

                <span>Ubicación</span>

                <span>Stock</span>
              </div>
            )}

            {lotLocations.map((lotLocation) => (
              <CommandItem
                key={lotLocation.id}
                value={`${lotLocation.id}@${lotLocation.lot.product.name}`}
                onSelect={() => {
                  onAdd(lotLocation.id)
                }}
                className='cursor-pointer gap-2 grid grid-cols-5 text-center'
                disabled={values.includes(
                  `${lotLocation.id}@${lotLocation.lot.product.name}`,
                )}
              >
                <span>{lotLocation.lotId}</span>

                <span className='col-span-2'>
                  {lotLocation.lot.product.name}
                </span>

                <span>{lotLocation.location.laboratory}</span>

                <span>{lotLocation.stock}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  )
}
