/* eslint-disable no-console */
import { ActionRes, ILog } from '../types'
import { handleLog } from './log-handler'

export const handleAction = async <T>(
  action: () => Promise<T>,
  path: string,
  log?: ILog,
): Promise<ActionRes<T>> => {
  try {
    const data = await action()

    if (log) await handleLog(log)

    return { data }
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      console.error(path, (error as { message: string }).message)
      return { error: (error as { message: string }).message }
    } else {
      const msg = 'Ha ocurrido un error en el servidor'
      console.error(path, msg)
      return { error: msg }
    }
  }
}
