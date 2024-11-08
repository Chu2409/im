import { Badge } from '@/core/shared/ui/badge'
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
import { Separator } from '@/core/shared/ui/separator'
import { cn } from '@/core/shared/utils/utils'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { CheckIcon } from 'lucide-react'
import { Location } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'
import debounce from 'just-debounce-it'
import { Input } from '@/core/shared/ui/input'
import { getLocationsToForm } from '@/core/locations/actions/get-locations-to-form'

interface LocationsSelectorProps {
  onAdd: (lotLocation?: Location) => void
  values: number[]
  disabled?: boolean
}

export const LocationsSelector: React.FC<LocationsSelectorProps> = ({
  onAdd,
  values,
  disabled,
}) => {
  const [locations, setLocations] = useState<Location[]>([])
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
      setLocations([])
      return
    }

    const fetchData = async () => {
      const { data = [] } = await getLocationsToForm(searchValue)

      setLocations(data)
    }

    fetchData()
  }, [searchValue])

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant='outline'
          className='h-9 bg-white border border-black border-opacity-20 w-full flex items-center justify-start gap-2 text-stone-500 font-normal'
        >
          <PlusCircledIcon className='h-4 w-4' />
          Seleccione las locaciones
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

      <PopoverContent
        className='p-0 -mt-1 w-[300px] sm:w-[250px] md:w-[280px] lg:w-[340px] xl:w-[400px]'
        align='start'
      >
        <Command
          filter={(value, search) =>
            value.toLowerCase().trim().includes(search.toLowerCase().trim())
              ? 1
              : 0
          }
        >
          <Input
            placeholder='Ingrese la locación...'
            className='mb-1'
            onChange={handleChange}
            value={inputValue}
          />

          <CommandList>
            <CommandEmpty>No hay locaciones disponibles</CommandEmpty>

            <CommandGroup>
              {locations.map((location) => {
                const isSelected = values.includes(location.id)
                return (
                  <CommandItem
                    key={`${location.id}`}
                    onSelect={() => onAdd(location)}
                    disabled={isSelected}
                    className='cursor-pointer'
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

                    <span>{`${location.name} - ${location.code} (${location.laboratory})`}</span>
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
