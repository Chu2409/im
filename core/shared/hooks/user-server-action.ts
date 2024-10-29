// 'use client'

// import { useToast } from '@/hooks/use-toast'
// import { useState } from 'react'
// import { handleAction } from '../utils/action-handler'
// import { useRouter } from 'next/navigation'

// export const useServerAction = <T>(
//   actionFn: () => Promise<T>,
//   options: {
//     successToastTitle?: string
//     successToastDescription?: string
//     errorToastDescription?: string
//   },
// ): [
//   (params: Parameters<typeof actionFn>[0]) => Promise<void>,
//   boolean,
//   string | null,
// ] => {
//   const { toast } = useToast()
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const router = useRouter()

//   const executeAction = async (params: Parameters<typeof actionFn>[0]) => {
//     setLoading(true)
//     setError(null)

//     const { data, error: actionError } = await handleAction(
//       async () => await actionFn(params),
//     )

//     if (actionError) {
//       toast({
//         variant: 'destructive',
//         title: 'Algo salió mal',
//         description: options.errorToastDescription || error,
//       })
//       setError(actionError)
//     } else if (data) {
//       toast({
//         variant: 'success',
//         title: options.successToastTitle || 'Éxito',
//         description:
//           options.successToastDescription ||
//           'Operación realizada correctamente',
//       })
//       router.refresh()
//     }

//     setLoading(false)
//   }

//   return [executeAction, loading, error]
// }
