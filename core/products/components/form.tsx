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
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { CATEGORIES } from '../data/categories'
import { Product } from '@prisma/client'
import { createProduct } from '../actions/create-product'
import { updateProduct } from '../actions/update-product'

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
  const toastTitle = initialData ? 'Producto actualizado' : 'Producto creado'
  const toastDescription = initialData
    ? 'El producto ha sido actualizado'
    : 'El producto ha sido creado'
  const errorMessage = initialData
    ? 'Hubo un error al actualizar el producto'
    : 'Hubo un error al crear el producto'

  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      category: initialData?.category || '',
    },
  })

  const action = initialData ? 'Actualizar locación' : 'Crear locación'

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (values: formType) => {
    setIsLoading(true)

    let result

    if (initialData) {
      result = updateProduct(initialData.id, values)
    } else {
      result = createProduct(values)
    }

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
                  <Select
                    disabled={isLoading}
                    // eslint-disable-next-line react/jsx-handler-names
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccione una categoría' />
                    </SelectTrigger>

                    <SelectContent>
                      {Object.entries(CATEGORIES).map(([, value]) => (
                        <SelectItem
                          key={value.id}
                          value={value.name}
                          className='cursor-pointer'
                        >
                          {value.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
