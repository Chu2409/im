/* eslint-disable no-console */
import { ActionRes } from '../types'

export const handleAction = async <T>(
  action: () => Promise<T>,
  path?: string,
): Promise<ActionRes<T>> => {
  try {
    const data = await action()
    return { data }
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      console.error(
        path || '[SERVER_ACTION_ERROR]',
        (error as { message: string }).message,
      )
      return { error: (error as { message: string }).message }
    } else {
      const newError = new Error('Ha ocurrido un error en el servidor')
      console.error(path || '[SERVER_ACTION_ERROR]', newError.message)
      return { error: newError.message }
    }
  }
}
