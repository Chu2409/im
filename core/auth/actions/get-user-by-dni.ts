'use server'

import { handleAction } from '@/core/shared/utils/actions-handlers'
import prisma from '@/core/shared/utils/prisma'

export const getUserByDni = async (dni: string) => {
  const getUserByDni = async () =>
    await prisma.user.findUnique({
      where: {
        dni,
      },
    })

  return await handleAction(getUserByDni, '[GET_USER_BY_DNI]')
}
