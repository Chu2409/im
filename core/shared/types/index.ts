import { ACTIONS } from '../data/actions'

export interface IRoute {
  href: string
  label: string
  icon: React.ReactElement
}

export interface IConstant {
  id: number
  name: string
  color: string
}

export interface IOption<T> {
  label: string
  value: T
}

export interface ActionRes<T> {
  data?: T
  error?: string
}

export interface ILog {
  entityId?: number
  table: string
  action: (typeof ACTIONS)[keyof typeof ACTIONS]
  content: object
}
