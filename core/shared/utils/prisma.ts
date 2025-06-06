import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-unused-vars, no-var
  var prismaGlobal: PrismaClient | undefined
}

const prisma = globalThis.prismaGlobal || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export default prisma
