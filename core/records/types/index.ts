import { Item, Record } from '@prisma/client'

export interface IRecordWithItems extends Record {
  items: Item[]
}
