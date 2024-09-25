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
import { Location } from '@prisma/client'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select'
import { laboratories } from '../data'
import { createLocation } from '../actions/create-location'
import { updateLocation } from '../actions/update-location'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

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
}: {
  initialData: Location | null
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      code: initialData?.code || '',
      laboratory: initialData?.laboratory || '',
    },
  })

  const toastTitle = initialData ? 'Locación actualizada' : 'Locación creada'
  const toastDescription = initialData
    ? 'La locación ha sido actualizada'
    : 'La locación ha sido creada'
  const errorMessage = initialData
    ? 'Hubo un error al actualizar la locación'
    : 'Hubo un error al crear la locación'
  const action = initialData ? 'Actualizar locación' : 'Crear locación'

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (values: formType) => {
    setIsLoading(true)

    let result

    if (initialData) result = updateLocation(initialData.id, values)
    else result = createLocation(values)

    if (result != null) {
      toast({
        variant: 'success',
        title: toastTitle,
        description: toastDescription,
      })
      router.push('/locations')
      router.refresh()
    } else {
      toast({
        variant: 'destructive',
        title: 'Algo salió mal',
        description: errorMessage,
      })
    }

    setIsLoading(false)
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
                  <Select
                    disabled={isLoading}
                    // eslint-disable-next-line react/jsx-handler-names
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona un laboratorio' />
                    </SelectTrigger>

                    <SelectContent>
                      {laboratories.map((lab) => (
                        <SelectItem
                          key={lab.id}
                          value={lab.laboratory}
                          className='cursor-pointer'
                        >
                          {lab.laboratory}
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

        <Button disabled={isLoading} type='submit'>
          {action}
        </Button>
      </form>
    </Form>
  )
}
