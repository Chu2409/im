import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { IActionRes } from '../types/actions'

interface ToastOptions {
  variant: 'success' | 'destructive'
  title: string
  description: string
}

const useToastNotification = <T>(toast: (options: ToastOptions) => void) => {
  const { refresh } = useRouter()

  const showNotification = useCallback(
    (
      toastData: IActionRes<T>,
      toastTitle: string,
      toastDescription: string,
    ) => {
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
        refresh()
      }
    },
    [toast, refresh],
  )

  return showNotification
}

export default useToastNotification
