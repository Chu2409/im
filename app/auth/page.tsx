import { LoginForm } from '@/core/auth/components/login-form'
import { authOptions } from '@/core/auth/data/auth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) redirect('/inventory')

  return (
    <div className='w-full flex h-full items-center justify-center bg-muted/50'>
      <LoginForm />
    </div>
  )
}

export default LoginPage
