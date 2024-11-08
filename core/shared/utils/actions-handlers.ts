/* eslint-disable no-console */
import * as Sentry from '@sentry/nextjs'
import { getEcuadorTimestamp } from './utils'
import { IPaginatedRes } from '../types/pagination'
import { IActionRes, ILog } from '../types/actions'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/core/auth/consts/auth-options'
import prisma from './prisma'

export const handleAction = async <T>(
  action: () => Promise<T>,
  path: string,
  log?: ILog,
): Promise<IActionRes<T>> => {
  try {
    const data = await action()

    if (log) await handleLog(log)

    return { data }
  } catch (error: unknown) {
    const context = {
      timestamp: getEcuadorTimestamp(),
      action: log?.action.label || 'Desconocido',
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

export const handlePaginatedAction = async <T>(
  action: () => Promise<IPaginatedRes<T>>,
  path: string,
  log?: ILog,
): Promise<IActionRes<IPaginatedRes<T>>> => {
  return handleAction(action, path, log)
}

const handleLog = async ({ entityId, table, action, content }: ILog) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('No autorizado')
  }

  await prisma.log.create({
    data: {
      user: session.user!.name!,
      entityId,
      table: table.label,
      action: action.label,
      content: JSON.stringify(content),
    },
  })
}
