import { PrismaClient } from '@prisma/client'
import { locations } from './data/locations'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.location.createMany({
    data: locations,
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
