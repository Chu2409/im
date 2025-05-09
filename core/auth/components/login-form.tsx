'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'

import { Button } from '@/core/shared/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/shared/ui/form'
import { Input } from '@/core/shared/ui/input'
import { LogIn } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/shared/ui/card'
import { useToast } from '@/core/shared/hooks/use-toast'
import { getUserByDni } from '../actions/get-user-by-dni'

const formSchema = z.object({
  dni: z
    .string()
    .regex(/^\d+$/, { message: 'Solo números' })
    .min(10, { message: 'Mínimo 9 caracteres' })
    .max(10, { message: 'Máximo 10 caracteres' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
})

export const LoginForm = () => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dni: '',
      password: '',
    },
  })

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/inventory')
  }, [router])

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    const res = await signIn('credentials', {
      dni: values.dni,
      password: values.password,
      redirect: false,
    })

    if (res?.error) {
      toast({
        variant: 'destructive',
        title: 'Ingreso fallido',
        description: 'Credenciales incorrectas, intenta de nuevo',
      })

      setIsLoading(false)
    } else {
      const { data: user } = await getUserByDni(values.dni)
      toast({
        variant: 'success',
        title: 'Ingreso exitoso',
        description: `Bienvenido de vuelta ${user?.firstName}!`,
      })

      router.push('/inventory')
    }
  }

  return (
    <Card className='w-full max-w-md mx-2 drop-shadow-2xl'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=''>
          <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription>
              Ingresa tu cédula y contraseña para acceder al sistema
            </CardDescription>
          </CardHeader>

          <CardContent className='grid gap-4'>
            <FormField
              control={form.control}
              name='dni'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cédula</FormLabel>
                  <FormControl>
                    <Input placeholder='1442121323' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='**********'
                      type='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              disabled={isLoading}
              type='submit'
              className='w-full gap-x-2'
            >
              Ingresar
              <LogIn className='w-4 h-4' />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
