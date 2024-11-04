import { ACTIONS } from '../data/actions'
import { TABLES } from '../data/tables'

export interface IActionRes<T> {
  data?: T
  error?: string
}

export interface ILog {
  entityId?: number
  table: (typeof TABLES)[keyof typeof TABLES]
  action: (typeof ACTIONS)[keyof typeof ACTIONS]
  content?: object
}
