import { Item, Product } from '@prisma/client'

export interface IItemWithProduct extends Item {
  product: Product
}

export interface IEditableRowItem {
  product: {
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
