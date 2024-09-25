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

const formSchema = z.object({
  name: z
    .string({ message: 'Ingrese el nombre del contacto' })
    .min(5, 'Mínimo 5 caracteres')
    .max(50, 'Máximo 50 caracteres'),
  contact: z
    .string({ message: 'Ingrese un número de contacto' })
    .min(2, 'Mínimo 9 caracteres')
    .max(10, 'Máximo 12 caracteres'),
})

type formType = z.infer<typeof formSchema>

export const ProviderForm = ({
  initialData,
}: {
  initialData: Provider | null
}) => {
  const router = useRouter()

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      contact: initialData?.contact || '',
    },
  })

  // const toastMessage = initialData ? 'Locación actualizada' : 'Locación creada'
  const action = initialData ? 'Actualizar proveedor' : 'Crear proveedor'

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (values: formType) => {
    try {
      setIsLoading(true)

      if (initialData) updateProvider(initialData.id, values)
      else createProvider(values)

      router.push('/providers')
      router.refresh()
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=''>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full mb-6'>
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

        <Button type='submit'>{action}</Button>
      </form>
    </Form>
  )
}
