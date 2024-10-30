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
import { Input } from '@/core/shared/ui/input'
import { Button } from '@/core/shared/ui/button'
import { Provider } from '@prisma/client'
import { createProvider } from '../actions/create-provider'
import { updateProvider } from '../actions/update-provider'
import useFormSubmit from '@/core/shared/hooks/use-form-submit'

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
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      contact: initialData?.contact || '',
    },
  })

  const action = initialData ? 'Actualizar proveedor' : 'Crear proveedor'
  const toastTitle = initialData ? 'Proveedor actualizado' : 'Proveedor creado'
  const toastDescription = initialData
    ? 'El proveedor ha sido actualizado correctamente'
    : 'El proveedor ha sido creado correctamente'

  const { onSubmit, isLoading } = useFormSubmit<Provider, formType>({
    initialData,
    createFn: createProvider,
    updateFn: updateProvider,
    toastTitle,
    toastDescription,
    onModalClose,
  })

  const handleSubmit = async (values: formType) => await onSubmit(values, form)

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
