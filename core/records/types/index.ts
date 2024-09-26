import { IItemWithProduct } from '@/core/items/types'
import { Record } from '@prisma/client'

export interface IRecordWithItems extends Record {
  items: IItemWithProduct[]
}
