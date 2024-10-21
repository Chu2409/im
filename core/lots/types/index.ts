import { Location, Lot, LotLocation, Product, Provider } from '@prisma/client'

export interface ILotWithProduct extends Lot {
  product: Product
}

export interface IFullLotLocation extends LotLocation {
  lot: ILotWithProduct
  location: Location
}

interface ILotLocationWithLocation extends LotLocation {
  location: Location
}
export interface IFullLot extends Lot {
  product: Product
  provider: Provider | null
  lotLocations: ILotLocationWithLocation[]
}
