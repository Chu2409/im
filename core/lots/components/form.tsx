/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
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
import { IFullLot } from '../types'
import { Input } from '@/ui/input'
import { Location, Product, Provider } from '@prisma/client'
import { DatePicker } from '@/core/shared/components/date-picker'
import { Combobox } from '@/core/shared/components/combobox/combobox'

const formSchema = z.object({
  quantityPurchased: z
    .number({ message: 'Ingrese la cantidad' })
    .min(1, 'Mínimo 1'),
  expirationDate: z.date({ message: 'Seleccione una fecha de expiración' }),
  price: z.number({ message: 'Ingrese el precio' }).min(1, 'Mínimo 1'),
  orderDate: z.date({ message: 'Seleccione una fecha de órden' }),
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
  // const toastTitle = initialData ? 'Lote actualizado' : 'Lote creado'
  // const toastDescription = initialData
  //   ? 'El lote ha sido actualizado correctamente'
  //   : 'El lote ha sido creado correctamente'
  // const errorMessage = initialData
  //   ? 'Hubo un error al actualizar el lote'
  //   : 'Hubo un error al crear el lote'
  const action = initialData ? 'Actualizar lote' : 'Crear lote'

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantityPurchased: initialData?.quantityPurchased || undefined,
      expirationDate: initialData?.expirationDate,
      price: initialData?.price || undefined,
      orderDate: initialData?.expirationDate,
      receptionDate: initialData?.receptionDate,
      productId: initialData?.productId,
      providerId: initialData?.providerId,
    },
  })

  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (values: formType) => {
    setIsLoading(true)

    let result

    // if (initialData)
    //   result = await updateRecordWithItems(initialData.id, {
    //     start: new Date(values.start),
    //     end: new Date(values.end),
    //     items: itemsTable,
    //   })
    // else
    //   result = await createRecordWithItems({
    //     start: new Date(values.start),
    //     end: new Date(values.end),
    //     items: itemsTable,
    //   })

    // if (result != null) {
    //   toast({
    //     variant: 'success',
    //     title: toastTitle,
    //     description: toastDescription,
    //   })

    //   const record = await getRecordWithItems(result)
    //   setRecord(record || undefined)
    //   router.refresh()
    // } else {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Algo salió mal',
    //     description: errorMessage,
    //   })

    //   setRecord(undefined)
    // }

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
            name='orderDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de órden</FormLabel>
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
        </div>

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
