import { useState, useCallback } from 'react'
import { ActionRes } from '../types'
import useToastNotification from './use-notification'
import { useToast } from './use-toast'
import { useRouter } from 'next/navigation'

interface UseFormSubmitProps<T, F> {
  initialData?: T
  createFn: (values: F) => Promise<ActionRes<T>>
  updateFn: (id: number, values: F) => Promise<ActionRes<T>>
  toastTitle: string
  toastDescription: string
  onModalClose?: () => void
}

const useFormSubmit = <T, F>({
  initialData,
  createFn,
  updateFn,
  toastTitle,
  toastDescription,
  onModalClose,
}: UseFormSubmitProps<T, F>) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const showNotification = useToastNotification(toast)

  const onSubmit = useCallback(
    async (values: F, form: { reset: () => void }) => {
      setIsLoading(true)

      const result = initialData
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await updateFn((initialData as any).id, values)
        : await createFn(values)

      showNotification(result, toastTitle, toastDescription)

      setIsLoading(false)

      if (!result.error) {
        form.reset()
        if (onModalClose) onModalClose()
        router.refresh()
      }
    },
    [
      initialData,
      updateFn,
      createFn,
      showNotification,
      toastTitle,
      toastDescription,
      onModalClose,
      router,
    ],
  )

  return { onSubmit, isLoading }
}

export default useFormSubmit
