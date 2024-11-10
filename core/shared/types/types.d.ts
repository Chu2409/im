import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      dni: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    dni: string
  }
}
