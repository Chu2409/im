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

export interface IEditableRowLotLocation {
  location: {
    id: number
    name: string
  }
  quantity: {
    value: number
    isEdited?: boolean
  }
  isSaved: boolean
  toDelete: boolean
  toEdit: boolean
}

export interface IUpsertLotLocationBulkProps extends Omit<Lot, 'id'> {
  lotLocations: IEditableRowLotLocation[]
}
