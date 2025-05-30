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
import { CATEGORIES_OPTIONS, getCategoryOptByLabel } from '../data/categories'
import { Product } from '@prisma/client'
import { createProduct } from '../actions/create-product'
import { updateProduct } from '../actions/update-product'
import { Combobox } from '@/core/shared/components/combobox/combobox'
import useFormSubmit from '@/core/shared/hooks/use-form-submit'

const formSchema = z.object({
  name: z
    .string({ message: 'Ingrese el nombre' })
    .min(4, 'Mínimo 4 caracteres')
    .max(80, 'Máximo 80 caracteres'),
  description: z
    .string({ message: 'Ingrese una descripción' })
    .min(5, 'Mínimo 5 caracteres')
    .max(200, 'Máximo 200 caracteres'),
  category: z
    .string({ message: 'Seleccione una categoría' })
    .min(1, 'Seleccione una categoría'),
})

type formType = z.infer<typeof formSchema>

export const ProductForm = ({
  initialData,
  onModalClose,
}: {
  initialData?: Product
  onModalClose: () => void
}) => {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      category: initialData?.category || '',
    },
  })

  const action = initialData ? 'Actualizar locación' : 'Crear locación'
  const toastTitle = initialData ? 'Producto actualizado' : 'Producto creado'
  const toastDescription = initialData
    ? 'El producto ha sido actualizado'
    : 'El producto ha sido creado'

  const { onSubmit, isLoading } = useFormSubmit<Product, formType>({
    initialData,
    createFn: createProduct,
    updateFn: updateProduct,
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
                    placeholder='Hemocultivo'
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
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>

                <FormControl>
                  <Input
                    placeholder='Reactivo para el diagnóstico de infecciones bacterianas en sangre'
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
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <Combobox
                    options={CATEGORIES_OPTIONS}
                    value={getCategoryOptByLabel(field.value)?.id}
                    selectMessage='Selecciona una categoría'
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
