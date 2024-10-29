import { useCallback } from 'react'
import { ActionRes } from '../types'
import { useRouter } from 'next/navigation'

interface ToastOptions {
  variant: 'success' | 'destructive'
  title: string
  description: string
}

const useToastNotification = <T>(toast: (options: ToastOptions) => void) => {
  const router = useRouter()

  const showNotification = useCallback(
    (toastData: ActionRes<T>, toastTitle: string, toastDescription: string) => {
      const { data: success, error } = toastData

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Algo salió mal',
          description:
            error.length > 40 ? 'Ha ocurrido un error en el servidor' : error,
        })
      } else if (success) {
        toast({
          variant: 'success',
          title: toastTitle,
          description: toastDescription,
        })
        router.refresh()
      }
    },
    [toast, router],
  )

  return showNotification
}

export default useToastNotification
