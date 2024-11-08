'use client'

import { getLotProductsToRecord } from '@/core/lots/actions/get-lot-products-to-record'
import { IFullLotLocation } from '@/core/lots/types'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/core/shared/ui/command'
import { Input } from '@/core/shared/ui/input'
import { Label } from '@/core/shared/ui/label'
import debounce from 'just-debounce-it'
import { useCallback, useEffect, useState } from 'react'

export const ItemSelector = ({
  onAdd,
  values,
}: {
  onAdd: (lotLocation: IFullLotLocation | undefined) => void
  values: number[]
}) => {
  const [lotLocations, setLotLocations] = useState<IFullLotLocation[]>([])
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
      setLotLocations([])
      return
    }

    const fetchData = async () => {
      const { data = [] } = await getLotProductsToRecord(searchValue)

      setLotLocations(data)
    }

    fetchData()
  }, [searchValue])

  return (
    <>
      <Label>Inventario disponible</Label>

      <Command className='border shadow-md -pb-2'>
        <Input
          placeholder='Ingrese el nombre del producto o la locación...'
          className='mb-1'
          onChange={handleChange}
          value={inputValue}
        />

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
                value={`${lotLocation.id}`}
                onSelect={() => {
                  onAdd(
                    lotLocations.find((lotLoc) => lotLoc.id === lotLocation.id),
                  )
                }}
                className='cursor-pointer gap-2 grid grid-cols-5 text-center'
                disabled={values.includes(lotLocation.id)}
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
