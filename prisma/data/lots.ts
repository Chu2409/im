interface ILot {
  quantityPurchased: number
  quantityPerUse: number
  expirationDate: Date
  price: number
  ordenDate: Date
  receptionDate: Date
  productId: number
  providerId?: number
}

export const lots: ILot[] = [
  {
    quantityPurchased: 34,
    quantityPerUse: 1,
    expirationDate: new Date('2025-06-01'),
    price: 435,
    ordenDate: new Date('2024-05-01'),
    receptionDate: new Date('2024-05-10'),
    productId: 2,
    providerId: 2,
  },
  {
    quantityPurchased: 128,
    quantityPerUse: 1,
    expirationDate: new Date('2025-06-01'),
    price: 100,
    ordenDate: new Date('2024-05-01'),
    receptionDate: new Date('2024-05-10'),
    productId: 5,
    providerId: 1,
  },
  {
    quantityPurchased: 333,
    quantityPerUse: 1,
    expirationDate: new Date('2025-06-01'),
    price: 1234,
    ordenDate: new Date('2024-05-01'),
    receptionDate: new Date('2024-05-10'),
    productId: 9,
    providerId: 1,
  },
]
