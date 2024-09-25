import { PrismaClient } from '@prisma/client'
import { locations } from './data/locations'
import { providers } from './data/providers'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.location.createMany({
    data: locations,
  })

  await prisma.provider.createMany({
    data: providers,
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
