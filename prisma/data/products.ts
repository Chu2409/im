interface IProduct {
  name: string
  description: string
  category: string
}

export const products: IProduct[] = [
  {
    name: 'Microscopio',
    description: 'Ultra mega microscopio',
    category: 'Equipo',
  },
  {
    name: 'Pipeta',
    description: 'Pipeta Pro',
    category: 'Equipo',
  },
  {
    name: 'Insumo raro',
    description: 'No se',
    category: 'Insumo',
  },
]
