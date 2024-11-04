export const STATUSES = {
  ACTIVE: { label: 'Activo', id: 1 },
  INACTIVE: { label: 'Inactivo', id: 0 },
} as const

export const getEstatusById = (id: number) => {
  return Object.values(STATUSES).find((type) => type.id === id)
}
