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
import { Location } from '@prisma/client'

const formSchema = z.object({
  quantityPurchased: z
    .number({ message: 'Ingrese la cantidad' })
    .min(1, 'Mínimo 1'),
  expirationDate: z.string(),
  price: z.number({ message: 'Ingrese el precio' }).min(1, 'Mínimo 1'),
  orderDate: z.string(),
  receptionDate: z.string().nullable(),
  productId: z.coerce
    .number({ message: 'Seleccione un producto' })
    .min(1, 'Seleccione un producto'),
  providerId: z.coerce.number().nullable(),
})

type formType = z.infer<typeof formSchema>

export const LotForm = ({
  initialData,
  locations,
  onModalClose,
}: {
  initialData?: IFullLot
  locations: Location[]
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
      expirationDate:
        initialData?.expirationDate.toLocaleDateString('en-CA') ||
        new Date().toLocaleDateString('en-CA'),
      price: initialData?.price || undefined,
      orderDate:
        initialData?.expirationDate.toLocaleDateString('en-CA') ||
        new Date().toLocaleDateString('en-CA'),
      receptionDate:
        initialData?.receptionDate?.toLocaleDateString('en-CA') || '',
      productId: initialData?.productId || undefined,
      providerId: initialData?.providerId || undefined,
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
            name='expirationDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de expiración</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className='cursor-pointer'
                    type='date'
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
            name='orderDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de órden</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className='cursor-pointer'
                    type='date'
                    {...field}
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
                  <Input
                    disabled={isLoading}
                    className='cursor-pointer'
                    type='date'
                    {...field}
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
