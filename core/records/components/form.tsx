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
import { IRecordWithItems } from '../types'
import { Input } from '@/ui/input'
import { Separator } from '@/ui/separator'

const formSchema = z.object({
  start: z.string(),
  end: z.string(),
})

type formType = z.infer<typeof formSchema>

export const RecordForm = ({
  initialData,
  onModalClose,
}: {
  initialData?: IRecordWithItems
  onModalClose: () => void
}) => {
  const toastTitle = initialData ? 'Registro actualizado' : 'Registro creado'
  const toastDescription = initialData
    ? 'El registro ha sido actualizado correctamente'
    : 'El registro ha sido creado correctamente'
  const errorMessage = initialData
    ? 'Hubo un error al actualizar el registro'
    : 'Hubo un error al crear el registro'
  const action = initialData ? 'Actualizar registro' : 'Crear registro'

  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start:
        initialData?.start.toLocaleDateString('en-CA') ||
        new Date().toLocaleDateString('en-CA'),
      end:
        initialData?.end.toLocaleDateString('en-CA') ||
        new Date().toLocaleDateString('en-CA'),
    },
  })

  const onSubmit = (values: formType) => {
    setIsLoading(true)

    let result

    // if (initialData) result = updateProvider(initialData.id, values)
    // else result = createProvider(values)

    if (result != null) {
      toast({
        variant: 'success',
        title: toastTitle,
        description: toastDescription,
      })

      router.push('/providers')
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
        className='flex flex-col gap-y-4'
        id='form'
      >
        <div className='grid gap-4 sm:grid-cols-2 2xl:grid-cols-3 w-full'>
          <FormField
            control={form.control}
            name='start'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de inicio</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className='flex justify-between items-center'
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
            name='end'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className='cursor-pointer'
                    placeholder='Nike Fast'
                    type='date'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className='ml-auto'>
          <Button
            type='submit'
            disabled={isLoading}
            form='form'
            className='w-44'
          >
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  )
}
