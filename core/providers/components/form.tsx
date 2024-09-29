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
import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { Provider } from '@prisma/client'
import { useState } from 'react'
import { createProvider } from '../actions/create-provider'
import { updateProvider } from '../actions/update-provider'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  name: z
    .string({ message: 'Ingrese el nombre del contacto' })
    .min(5, 'Mínimo 5 caracteres')
    .max(50, 'Máximo 50 caracteres'),
  contact: z
    .string({ message: 'Ingrese un número de contacto' })
    .min(9, 'Mínimo 9 caracteres')
    .max(12, 'Máximo 12 caracteres'),
})

type formType = z.infer<typeof formSchema>

export const ProviderForm = ({
  initialData,
  onModalClose,
}: {
  initialData?: Provider
  onModalClose: () => void
}) => {
  const toastTitle = initialData ? 'Proveedor actualizado' : 'Proveedor creado'
  const toastDescription = initialData
    ? 'El proveedor ha sido actualizado correctamente'
    : 'El proveedor ha sido creado correctamente'
  const errorMessage = initialData
    ? 'Hubo un error al actualizar el proveedor'
    : 'Hubo un error al crear el proveedor'
  const action = initialData ? 'Actualizar proveedor' : 'Crear proveedor'

  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      contact: initialData?.contact || '',
    },
  })

  const onSubmit = (values: formType) => {
    setIsLoading(true)

    let result

    if (initialData) result = updateProvider(initialData.id, values)
    else result = createProvider(values)

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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid gap-4 sm:grid-cols-2 w-full'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>

                <FormControl>
                  <Input
                    placeholder='Javier Medina'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='contact'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contacto</FormLabel>

                <FormControl>
                  <Input
                    placeholder='0967229875'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={isLoading} type='submit'>
          {action}
        </Button>
      </form>
    </Form>
  )
}
