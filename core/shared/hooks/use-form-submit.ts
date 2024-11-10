import { useState, useCallback } from 'react'
import useToastNotification from './use-notification'
import { useToast } from './use-toast'
import { useRouter } from 'next/navigation'
import { IActionRes } from '../types/actions'

interface UseFormSubmitProps<T, F> {
  initialData?: T
  createFn: (values: F) => Promise<IActionRes<T>>
  updateFn: (id: number, values: F) => Promise<IActionRes<T>>
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
  const { refresh } = useRouter()

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
        refresh()
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
      refresh,
    ],
  )

  return { onSubmit, isLoading }
}

export default useFormSubmit
