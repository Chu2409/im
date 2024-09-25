import { PrismaClient } from '@prisma/client'
import { locations } from './data/locations'
import { providers } from './data/providers'
import { products } from './data/products'
import { records } from './data/record'
import { items } from './data/items'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.location.createMany({
    data: locations,
  })

  await prisma.provider.createMany({
    data: providers,
  })

  await prisma.product.createMany({
    data: products,
  })

  await prisma.record.createMany({
    data: records,
  })

  await prisma.item.createMany({
    data: items,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async () => {
    await prisma.$disconnect()
    process.exit(1)
  })
