import { IOption } from '../types'

export const TABLES: {
  [key: string]: IOption
} = {
  LOCATIONS: { id: 1, label: 'Locaciones' },
  PROVIDERS: { id: 2, label: 'Proveedores' },
  PRODUCTS: { id: 3, label: 'Productos' },
  ALERTS: { id: 4, label: 'Alertas' },
  RECORDS: { id: 5, label: 'Registros' },
  LOTS: { id: 6, label: 'Lotes' },
} as const

export const TABLES_OPTIONS = Object.values(TABLES)

export const getTableById = (id: number) =>
  TABLES_OPTIONS.find((type) => type.id === id)

export const getTableByLabel = (label: string) =>
  TABLES_OPTIONS.find(
    (type) => type.label.toLowerCase() === label.toLowerCase(),
  )
