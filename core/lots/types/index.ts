import { Location, Lot, LotLocation, Product } from '@prisma/client'

export interface ILotWithProduct extends Lot {
  product: Product
}

export interface IFullLotLocation extends LotLocation {
  lot: ILotWithProduct
  location: Location
}
