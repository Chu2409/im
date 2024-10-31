'use server'

import { authOptions } from '@/core/auth/consts/auth-options'
import { getServerSession } from 'next-auth'
import prisma from './prisma'
import { ILog } from '../types'

export const handleLog = async ({ entityId, table, action, content }: ILog) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('No autorizado')
  }

  await prisma.log.create({
    data: {
      user: session.user!.name!,
      entityId,
      table: table.name,
      action: action.name,
      content: JSON.stringify(content),
    },
  })
}
