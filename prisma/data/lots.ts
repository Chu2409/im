interface ILot {
  quantityPurchased: number
  usesPerUnit: number
  maxUses: number
  expirationDate: Date | null
  price: number
  orderDate: Date
  receptionDate: Date | null
  productId: number
  providerId?: number
}

export const lots: ILot[] = [
  {
    quantityPurchased: 34,
    usesPerUnit: 1,
    maxUses: 34 * 1,
    expirationDate: new Date('2025-06-01'),
    price: 435,
    orderDate: new Date('2024-05-01'),
    receptionDate: new Date('2024-05-10'),
    productId: 2,
    providerId: 2,
  },
  {
    quantityPurchased: 128,
    usesPerUnit: 1,
    maxUses: 128 * 1,
    expirationDate: new Date('2025-06-01'),
    price: 100,
    orderDate: new Date('2024-05-01'),
    receptionDate: new Date('2024-05-10'),
    productId: 5,
    providerId: 1,
  },
  {
    quantityPurchased: 333,
    usesPerUnit: 1,
    maxUses: 333 * 1,
    expirationDate: new Date('2025-06-01'),
    price: 1234,
    orderDate: new Date('2024-05-01'),
    receptionDate: new Date('2024-05-10'),
    productId: 9,
    providerId: 1,
  },
]
