interface ILotLocation {
  stock: number
  lotId: number
  locationId: number
}

export const lotsLocations: ILotLocation[] = [
  {
    stock: 10,
    lotId: 1,
    locationId: 1,
  },
  {
    stock: 24,
    lotId: 1,
    locationId: 4,
  },
  {
    stock: 60,
    lotId: 2,
    locationId: 1,
  },
  {
    stock: 68,
    lotId: 2,
    locationId: 4,
  },
  {
    stock: 200,
    lotId: 3,
    locationId: 1,
  },
  {
    stock: 133,
    lotId: 3,
    locationId: 4,
  },
]
