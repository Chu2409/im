import { ACTIONS } from '../data/actions'
import { TABLES } from '../data/tables'

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
  table: (typeof TABLES)[keyof typeof TABLES]
  action: (typeof ACTIONS)[keyof typeof ACTIONS]
  content: object
}
