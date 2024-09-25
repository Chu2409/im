interface ILocation {
  name: string
  code: string
  laboratory: string
}

export const locations: ILocation[] = [
  {
    name: 'Refrigeradora Piso 1',
    code: 'RP1-L1',
    laboratory: 'Centro',
  },
  {
    name: 'Refrigeradora Piso 2',
    code: 'RP2-L1',
    laboratory: 'Centro',
  },
  {
    name: 'Sala 1',
    code: 'SA1-L1',
    laboratory: 'Centro',
  },
  {
    name: 'Refrigeradora Piso 4',
    code: 'RP4-L2',
    laboratory: 'Sur',
  },
  {
    name: 'Refrigeradora Piso 3',
    code: 'RP3-LS',
    laboratory: 'Sur',
  },
  {
    name: 'Sala 2',
    code: 'SA2-L2',
    laboratory: 'Sur',
  },
]
