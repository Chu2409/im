import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import prisma from '@/core/shared/utils/prisma'
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        dni: { label: 'Cédula', type: 'text' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.dni || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { dni: credentials?.dni },
        })

        if (!user) return null

        const passwordMatch = bcrypt.compareSync(
          credentials.password,
          user.password,
        )

        if (!passwordMatch) return null

        return {
          id: user.id.toString(),
          name: user.firstName + ' ' + user.lastName,
          dni: user.dni,
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string
        session.user.dni = token.dni as string
        session.user.name = token.name as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.dni = user.dni
        token.name = user.name
      }
      return token
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 28800,
    updateAge: 14400,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth',
  },
} satisfies NextAuthOptions
