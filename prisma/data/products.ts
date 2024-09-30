import { CATEGORIES } from '@/core/products/data/categories'

interface IProduct {
  name: string
  description: string
  category: string
}

export const products: IProduct[] = [
  {
    name: 'Microscopio Óptico',
    description: 'Microscopio para análisis de muestras biológicas.',
    category: CATEGORIES.EQUIPMENT.name,
  },
  {
    name: 'Tubo de ensayo',
    description: 'Tubo de vidrio para contener muestras líquidas.',
    category: CATEGORIES.AGENTS.name,
  },
  {
    name: 'Centrífuga de Laboratorio',
    description: 'Centrífuga para la separación de componentes sanguíneos.',
    category: CATEGORIES.EQUIPMENT.name,
  },
  {
    name: 'Pipeta Volumétrica',
    description: 'Pipeta para medir volúmenes exactos de líquidos.',
    category: CATEGORIES.MATERIALS.name,
  },
  {
    name: 'Glucosa reactivo',
    description: 'Reactivo para pruebas de glucosa en sangre.',
    category: CATEGORIES.AGENTS.name,
  },
  {
    name: 'Portaobjetos de vidrio',
    description: 'Lámina delgada de vidrio para muestras microscópicas.',
    category: CATEGORIES.MATERIALS.name,
  },
  {
    name: 'Incubadora de Laboratorio',
    description: 'Incubadora para el cultivo de bacterias y hongos.',
    category: CATEGORIES.EQUIPMENT.name,
  },
  {
    name: 'Espectrofotómetro',
    description: 'Dispositivo para medir la absorbancia de luz en soluciones.',
    category: CATEGORIES.EQUIPMENT.name,
  },
  {
    name: 'Agujas Hipodérmicas',
    description: 'Agujas para extracción de muestras sanguíneas.',
    category: CATEGORIES.MATERIALS.name,
  },
  {
    name: 'Hemocultivo',
    description:
      'Reactivo para el diagnóstico de infecciones bacterianas en sangre.',
    category: CATEGORIES.AGENTS.name,
  },
  {
    name: 'Vasos de Precipitados',
    description:
      'Vasos de vidrio para reacciones químicas y manejo de líquidos.',
    category: CATEGORIES.MATERIALS.name,
  },
  {
    name: 'Tiras Reactivas de pH',
    description: 'Tiras para medir el nivel de pH en soluciones.',
    category: CATEGORIES.AGENTS.name,
  },
  {
    name: 'Autoclave de Laboratorio',
    description: 'Equipo para la esterilización de materiales mediante vapor.',
    category: CATEGORIES.EQUIPMENT.name,
  },
  {
    name: 'Bisturí Desechable',
    description: 'Herramienta quirúrgica para cortes precisos en tejidos.',
    category: CATEGORIES.MATERIALS.name,
  },
  {
    name: 'Reactivo de Proteína C Reactiva (PCR)',
    description: 'Reactivo utilizado para medir los niveles de PCR en sangre.',
    category: CATEGORIES.AGENTS.name,
  },
  {
    name: 'Baño María',
    description:
      'Equipo de laboratorio para mantener la temperatura de las soluciones.',
    category: CATEGORIES.EQUIPMENT.name,
  },
  {
    name: 'Placa de Petri',
    description:
      'Placas de vidrio o plástico para el cultivo de microorganismos.',
    category: CATEGORIES.MATERIALS.name,
  },
]
