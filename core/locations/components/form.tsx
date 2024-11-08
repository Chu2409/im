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
import { Location } from '@prisma/client'
import { LABORATORIES_OPTIONS } from '../data/labobratories'
import { createLocation } from '../actions/create-location'
import { updateLocation } from '../actions/update-location'
import { Combobox } from '@/core/shared/components/combobox/combobox'
import useFormSubmit from '@/core/shared/hooks/use-form-submit'

const formSchema = z.object({
  name: z
    .string({ message: 'Ingrese el nombre' })
    .min(5, 'Mínimo 5 caracteres')
    .max(50, 'Máximo 50 caracteres'),
  code: z
    .string({ message: 'Ingrese un código' })
    .min(2, 'Mínimo 2 caracteres')
    .max(10, 'Máximo 10 caracteres'),
  laboratory: z
    .string({ message: 'Seleccione un laboratorio' })
    .min(1, 'Seleccione un laboratorio'),
})

type formType = z.infer<typeof formSchema>

export const LocationForm = ({
  initialData,
  onModalClose,
}: {
  initialData?: Location
  onModalClose: () => void
}) => {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      code: initialData?.code || '',
      laboratory: initialData?.laboratory || '',
    },
  })

  const action = initialData ? 'Actualizar locación' : 'Crear locación'
  const toastTitle = initialData ? 'Locación actualizada' : 'Locación creada'
  const toastDescription = initialData
    ? 'La locación ha sido actualizada'
    : 'La locación ha sido creada'

  const { onSubmit, isLoading } = useFormSubmit<Location, formType>({
    initialData,
    createFn: createLocation,
    updateFn: updateLocation,
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
                  <Input placeholder='Sala 1' disabled={isLoading} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>

                <FormControl>
                  <Input
                    placeholder='SL1-L1'
                    disabled={isLoading}
                    {...field}
                    value={field.value.toUpperCase()}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='laboratory'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Laboratorio</FormLabel>
                <FormControl>
                  <Combobox
                    options={LABORATORIES_OPTIONS}
                    value={Number(field.value)}
                    selectMessage='Selecciona un laboratorio'
                    // eslint-disable-next-line react/jsx-handler-names
                    onChange={field.onChange}
                    disabled={isLoading}
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
