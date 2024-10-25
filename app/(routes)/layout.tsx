import { authOptions } from '@/core/auth/consts/auth-options'
import { MainLayout } from '@/core/shared/components/layout/main-layout'
import { routes } from '@/core/shared/data/routes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/auth')

  return (
    <>
      <MainLayout routes={routes}>{children}</MainLayout>
    </>
  )
}

export default RootLayout
