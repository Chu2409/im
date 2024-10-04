import { MainLayout } from '@/core/shared/components/layout/main-layout'
import { routes } from '@/core/shared/data/routes'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainLayout routes={routes}>{children}</MainLayout>
    </>
  )
}

export default RootLayout
