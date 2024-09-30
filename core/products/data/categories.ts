// interface ICategory {
//   name: string
//   color: string
// }

export const CATEGORIES = {
  AGENTS: { name: 'Reactivos', color: 'red' },
  INPUTS: { name: 'Insumos', color: 'blue' },
  EQUIPMENT: { name: 'Equipos', color: 'green' },
  MATERIALS: { name: 'Materiales', color: 'yellow' },
} as const

// type CategoryKey = keyof typeof Categories

// export const getCategoryInfo = (key: CategoryKey): ICategory => {
//   return Categories[key]
// }
