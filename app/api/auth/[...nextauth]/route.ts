import { authOptions } from '@/core/auth/consts/auth-options'
import NextAuth from 'next-auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
