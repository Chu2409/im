interface IAlert {
  lotLocationId: number
  resolved: boolean
  type: 'Expiración' | 'Restock'
  severity: 'Alto' | 'Medio' | 'Bajo'
}

export const alerts: IAlert[] = [
  {
    lotLocationId: 1,
    resolved: false,
    severity: 'Alto',
    type: 'Expiración',
  },
  {
    lotLocationId: 3,
    resolved: false,
    severity: 'Medio',
    type: 'Expiración',
  },
  {
    lotLocationId: 5,
    resolved: false,
    severity: 'Bajo',
    type: 'Restock',
  },
]
