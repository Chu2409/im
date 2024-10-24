import { IFullLotLocation } from '@/core/lots/types'
import { Item } from '@prisma/client'

export interface IItemWithLotLocation extends Item {
  lotLocation: IFullLotLocation
}

export interface IEditableRowItem {
  lotLocation: {
    id: number
    productName: string
    lotId: number
    laboratory: string
    maxQuantity: number
  }
  quantity: {
    value: number
    isEdited?: boolean
  }
  isSaved: boolean
  toDelete: boolean
  toEdit: {
    value: boolean
    oldQuantity: number
  }
}
