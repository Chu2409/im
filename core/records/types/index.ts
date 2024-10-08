import { IEditableRowItem, IItemWithLotLocation } from '@/core/items/types'
import { Record } from '@prisma/client'

export interface IRecordWithItems extends Record {
  items: IItemWithLotLocation[]
}

export interface IUpsertProductBulkProps extends Omit<Record, 'id'> {
  items: IEditableRowItem[]
}
