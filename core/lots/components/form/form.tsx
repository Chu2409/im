/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/shared/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/core/shared/ui/button'
import { useState } from 'react'
import {
  IEditableRowLotLocation,
  IFullLot,
  IUpsertLotLocationBulkProps,
} from '../../types'
import { Input } from '@/core/shared/ui/input'
import { Lot, Product, Provider } from '@prisma/client'
import { DatePicker } from '@/core/shared/components/date-picker'
import { createLotWithLocations } from '../../actions/create-lot-with-locations'
import { updateLotWithLocations } from '../../actions/update-lot-with-locations'
import useFormSubmit from '@/core/shared/hooks/use-form-submit'
import { ProductsSelector } from './products-selector'
import { LotLocationFormDataTable } from './form-data-table'
import { ProvidersSelector } from './providers-selector'
import { LocationsSelector } from './location-selector'

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
  onModalClose,
}: {
  initialData?: IFullLot
  onModalClose: () => void
}) => {
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

  const [productSelected, setProductSelected] = useState<Product | undefined>(
    () => initialData?.product,
  )
  const [providerSelected, setProviderSelected] = useState<
    Provider | undefined
  >(() => initialData?.provider || undefined)

  const action = initialData ? 'Actualizar lote' : 'Crear lote'
  const toastTitle = initialData ? 'Lote actualizado' : 'Lote creado'
  const toastDescription = initialData
    ? 'El lote ha sido actualizado correctamente'
    : 'El lote ha sido creado correctamente'

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

  const { onSubmit, isLoading } = useFormSubmit<
    Lot,
    IUpsertLotLocationBulkProps
  >({
    initialData,
    createFn: createLotWithLocations,
    updateFn: updateLotWithLocations,
    toastTitle,
    toastDescription,
    onModalClose,
  })

  const handleSubmit = async (values: formType) =>
    await onSubmit(
      {
        ...values,
        expirationDate: values.expirationDate || null,
        receptionDate: values.receptionDate || null,
        providerId: values.providerId || null,
        lotLocations: lotLocationsTable,
      },
      form,
    )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
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
                  <ProductsSelector
                    value={productSelected}
                    onChange={(product) => {
                      setProductSelected(product)
                      field.onChange(product?.id)
                    }}
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
                  <ProvidersSelector
                    value={providerSelected}
                    onChange={(provider) => {
                      setProviderSelected(provider)
                      field.onChange(provider?.id)
                    }}
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
              <LocationsSelector
                disabled={isLoading}
                values={lotLocationsTable.map(
                  (lotLocation) => lotLocation.location.id,
                )}
                onAdd={(location) => {
                  if (location) {
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
                  }
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
