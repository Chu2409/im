/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { IEditableRowLotLocation, IFullLot } from '../types'
import { Input } from '@/ui/input'
import { Location, Product, Provider } from '@prisma/client'
import { DatePicker } from '@/core/shared/components/date-picker'
import { Combobox } from '@/core/shared/components/combobox/combobox'
import { MultiCombobox } from '@/core/shared/components/combobox/multi-combobox'
import { LotLocationFormDataTable } from './form-data-table'
import { createLotWithLocations } from '../actions/create-lot-with-locations'
import { updateLotWithLocations } from '../actions/update-lot-with-locations'

const formSchema = z.object({
  quantityPurchased: z.coerce
    .number({ message: 'Ingrese la cantidad' })
    .min(1, 'Mínimo 1'),
  usesPerUnit: z.coerce
    .number({ message: 'Ingrese la cantidad' })
    .min(0.01, 'Mínimo 0.01'),
  expirationDate: z.date().nullish(),
  price: z.coerce.number({ message: 'Ingrese el precio' }).min(1, 'Mínimo 1'),
  orderDate: z.date({
    message: 'Seleccione una fecha',
  }),
  receptionDate: z.date().nullish(),
  productId: z.coerce
    .number({ message: 'Seleccione un producto' })
    .min(1, 'Seleccione un producto'),
  providerId: z.coerce.number().nullish(),
})

type formType = z.infer<typeof formSchema>

export const LotForm = ({
  initialData,
  locations,
  providers,
  products,
  onModalClose,
}: {
  initialData?: IFullLot
  locations: Location[]
  products: Product[]
  providers: Provider[]
  onModalClose: () => void
}) => {
  const toastTitle = initialData ? 'Lote actualizado' : 'Lote creado'
  const toastDescription = initialData
    ? 'El lote ha sido actualizado correctamente'
    : 'El lote ha sido creado correctamente'
  const errorMessage = initialData
    ? 'Hubo un error al actualizar el lote'
    : 'Hubo un error al crear el lote'
  const action = initialData ? 'Actualizar lote' : 'Crear lote'

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // @ts-ignore
      quantityPurchased: initialData?.quantityPurchased || '',
      // @ts-ignore
      usesPerUnit: initialData?.usesPerUnit || '',
      expirationDate: initialData?.expirationDate,
      // @ts-ignore
      price: initialData?.price || '',
      orderDate: initialData?.orderDate,
      receptionDate: initialData?.receptionDate,
      productId: initialData?.productId,
      providerId: initialData?.providerId,
    },
  })

  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [lotLocationsTable, setLotLocationsTable] = useState<
    IEditableRowLotLocation[]
  >(
    () =>
      initialData?.lotLocations.map((lotLocation) => ({
        location: {
          id: lotLocation.locationId,
          name: `${lotLocation.location.name} - ${lotLocation.location.code}  (${lotLocation.location.laboratory})`,
        },
        quantity: {
          value: lotLocation.stock,
        },
        isSaved: true,
        toDelete: false,
        toEdit: false,
      })) || [],
  )

  const onSubmit = async (values: formType) => {
    setIsLoading(true)

    let result

    if (initialData)
      result = await updateLotWithLocations(initialData.id, {
        ...values,
        expirationDate: values.expirationDate || null,
        receptionDate: values.receptionDate || null,
        providerId: values.providerId || null,
        lotLocations: lotLocationsTable,
      })
    else
      result = await createLotWithLocations({
        ...values,
        expirationDate: values.expirationDate || null,
        receptionDate: values.receptionDate || null,
        providerId: values.providerId || null,
        lotLocations: lotLocationsTable,
      })

    if (result != null) {
      toast({
        variant: 'success',
        title: toastTitle,
        description: toastDescription,
      })

      router.refresh()
    } else {
      toast({
        variant: 'destructive',
        title: 'Algo salió mal',
        description: errorMessage,
      })
    }

    setIsLoading(false)
    form.reset()
    onModalClose()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
        id='form'
      >
        <div className='grid gap-3 sm:grid-cols-2 w-full'>
          <FormField
            control={form.control}
            name='productId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Producto</FormLabel>

                <FormControl>
                  <Combobox<number>
                    options={products.map((product) => ({
                      value: product.id,
                      label: product.name,
                    }))}
                    value={field.value}
                    selectMessage='Selecciona un producto'
                    // eslint-disable-next-line react/jsx-handler-names
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='quantityPurchased'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad Adquirida</FormLabel>

                <FormControl>
                  <Input
                    placeholder='224'
                    disabled={isLoading}
                    type='number'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='usesPerUnit'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usos por unidad (U/U)</FormLabel>

                <FormControl>
                  <Input
                    placeholder='2'
                    disabled={isLoading || initialData != null}
                    type='number'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>

                <FormControl>
                  <Input
                    placeholder='3550'
                    disabled={isLoading}
                    type='number'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='providerId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proveedor</FormLabel>

                <FormControl>
                  <Combobox<number>
                    options={providers.map((provider) => ({
                      value: provider.id,
                      label: provider.name,
                    }))}
                    value={field.value || undefined}
                    selectMessage='Seleccione un proveedor'
                    // eslint-disable-next-line react/jsx-handler-names
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='expirationDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de expiración</FormLabel>
                <FormControl>
                  <DatePicker
                    disabled={isLoading}
                    value={field.value || undefined}
                    // eslint-disable-next-line react/jsx-handler-names
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='orderDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de orden</FormLabel>
                <FormControl>
                  <DatePicker
                    disabled={isLoading}
                    value={field.value}
                    // eslint-disable-next-line react/jsx-handler-names
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='receptionDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de recepción</FormLabel>
                <FormControl>
                  <DatePicker
                    disabled={isLoading}
                    value={field.value || undefined}
                    // eslint-disable-next-line react/jsx-handler-names
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Locaciones</FormLabel>

            <FormControl>
              <MultiCombobox
                disabled={isLoading}
                title='Seleccione las locaciones...'
                values={lotLocationsTable.map(
                  (lotLocation) => lotLocation.location.id,
                )}
                options={locations.map((location) => ({
                  value: location.id,
                  label: `${location.name} - ${location.code} (${location.laboratory})`,
                }))}
                onAdd={(locationId) => {
                  const location = locations.find(
                    (location) => location.id === locationId,
                  )!

                  const newLotLocationsTable = lotLocationsTable.concat({
                    location: {
                      id: location.id,
                      name: `${location.name} - ${location.code}  (${location.laboratory})`,
                    },
                    quantity: {
                      value: 1,
                    },
                    isSaved: false,
                    toDelete: false,
                    toEdit: false,
                  })

                  setLotLocationsTable(newLotLocationsTable)
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>

        <LotLocationFormDataTable
          data={lotLocationsTable}
          onDelete={(isSaved, id) => {
            if (isSaved) {
              const updatedLotLocationsTable = lotLocationsTable.map(
                (lotLocation) => {
                  if (lotLocation.location.id === id)
                    return {
                      ...lotLocation,
                      toDelete: lotLocation.toDelete
                        ? !lotLocation.toDelete
                        : true,
                    }

                  return lotLocation
                },
              )
              setLotLocationsTable(updatedLotLocationsTable)
            } else {
              const updatedLotLocationsTable = lotLocationsTable.filter(
                (lotLocation) => lotLocation.location.id !== id,
              )
              setLotLocationsTable(updatedLotLocationsTable)
            }
          }}
          onQuantityBlur={(isSaved: boolean, id: number, quantity: number) => {
            const updatedLotLocationsTable = lotLocationsTable.map(
              (lotLocation) => {
                if (lotLocation.location.id === id)
                  return {
                    ...lotLocation,
                    quantity: { value: quantity, isEdited: !!isSaved },
                    toEdit: !!isSaved,
                  }

                return lotLocation
              },
            )
            setLotLocationsTable(updatedLotLocationsTable)
          }}
        />

        <div className='ml-auto'>
          <Button
            disabled={isLoading}
            type='submit'
            form='form'
            className='px-6'
          >
            {action}
          </Button>
        </div>
      </form>
    </Form>
  )
}
