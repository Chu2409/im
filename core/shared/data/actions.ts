import { IOption } from '../types'

export const ACTIONS: {
  [key: string]: IOption
} = {
  CREATE: { id: 1, label: 'Creación' },
  UPDATE: { id: 2, label: 'Actualización' },
  STATUS: { id: 3, label: 'Cambio de estado' },
  DELETE: { id: 3, label: 'Eliminación' },
} as const

export const ACTIONS_OPTIONS = Object.values(ACTIONS)

export const getActionById = (id: number): IOption | undefined =>
  ACTIONS_OPTIONS.find((action) => action.id === id)

export const getActionByLabel = (label: string): IOption | undefined =>
  ACTIONS_OPTIONS.find(
    (action) => action.label.toLowerCase() === label.toLowerCase(),
  )
