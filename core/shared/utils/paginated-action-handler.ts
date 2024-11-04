/* eslint-disable no-console */
import { ActionRes, ILog } from '../types'
import { IPaginatedRes } from '../types/pagination'
import { getEcuadorTimestamp } from './date-helpers'
import { handleLog } from './log-handler'
import * as Sentry from '@sentry/nextjs'

export const handlePaginatedAction = async <T>(
  action: () => Promise<IPaginatedRes<T>>,
  path: string,
  log?: ILog,
): Promise<ActionRes<IPaginatedRes<T>>> => {
  try {
    const data = await action()

    if (log) await handleLog(log)

    return { data }
  } catch (error: unknown) {
    const context = {
      timestamp: getEcuadorTimestamp(),
      action: log?.action.name || 'Desconocido',
    }

    let errorMessage: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errorDetails: Record<string, any> = {}

    if (error instanceof Error) {
      errorMessage = error.message
      errorDetails = {
        name: error.name,
        cause: error.cause,
      }
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error
    ) {
      errorMessage = (error as { message: string }).message
      errorDetails = { ...error }
    } else {
      errorMessage = 'Ha ocurrido un error en el servidor'
      errorDetails = { originalError: error }
    }

    if (process.env.NODE_ENV === 'production') {
      Sentry.withScope((scope) => {
        scope.setLevel('error')
        scope.setContext('action', context)
        scope.setContext('error_details', errorDetails)
        scope.setTag('path', path)

        Sentry.captureException(
          error instanceof Error ? error : new Error(errorMessage),
        )
      })
    } else {
      console.error('Server Action Error:', {
        path,
        errorMessage,
        errorDetails,
        context,
      })
    }

    return { error: errorMessage }
  }
}
