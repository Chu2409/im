'use server'

import prisma from '@/core/shared/utils/prisma'

export const getUserByDni = async (dni: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        dni,
      },
    })

    return user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('[GET_USER_BY_DNI]', error.message)
    return null
  }
}
