import { PrismaClient } from '@prisma/client'
import { locations } from './data/locations'
import { providers } from './data/providers'
import { products } from './data/products'
import { lots } from './data/lots'
import { lotsLocations } from './data/lots-locations'
import { records } from './data/record'
import { items } from './data/items'
import { users } from './data/users'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.provider.createMany({
    data: providers,
  })

  await prisma.product.createMany({
    data: products,
  })

  await prisma.location.createMany({
    data: locations,
  })

  await prisma.lot.createMany({
    data: lots,
  })

  await prisma.lotLocation.createMany({
    data: lotsLocations,
  })

  await prisma.record.createMany({
    data: records,
  })

  await prisma.item.createMany({
    data: items,
  })

  await prisma.user.createMany({
    data: users,
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
