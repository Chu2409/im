import { IEditableRowItem, IItemWithProduct } from '@/core/items/types'
import { Record } from '@prisma/client'

export interface IRecordWithItems extends Record {
  items: IItemWithProduct[]
}

export interface IUpsertProductBulkProps extends Omit<Record, 'id'> {
  items: IEditableRowItem[]
}
