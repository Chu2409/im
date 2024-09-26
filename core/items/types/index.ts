import { Item, Product } from '@prisma/client'

export interface IItemWithProduct extends Item {
  product: Product
}
