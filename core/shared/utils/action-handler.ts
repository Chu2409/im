/* eslint-disable no-console */
import { ActionRes } from '../types'

export const handleAction = async <T>(
  action: () => Promise<T>,
  path: string,
): Promise<ActionRes<T>> => {
  try {
    const data = await action()
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
