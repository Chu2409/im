interface ILotLocation {
  quantity: number
  lotId: number
  locationId: number
}

export const lotsLocations: ILotLocation[] = [
  {
    quantity: 10,
    lotId: 1,
    locationId: 1,
  },
  {
    quantity: 24,
    lotId: 1,
    locationId: 4,
  },
  {
    quantity: 60,
    lotId: 2,
    locationId: 1,
  },
  {
    quantity: 68,
    lotId: 2,
    locationId: 4,
  },
  {
    quantity: 200,
    lotId: 3,
    locationId: 1,
  },
  {
    quantity: 133,
    lotId: 3,
    locationId: 4,
  },
]
