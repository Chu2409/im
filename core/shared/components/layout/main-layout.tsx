'use client'

import { IRoute } from '../../types'
import { usePathname } from 'next/navigation'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'

export const MainLayout = ({
  children,
  routes,
}: {
  routes: IRoute[]
  children: React.ReactNode
}) => {
  const pathname = usePathname()

  return (
    <div className='grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <Sidebar routes={routes} pathname={pathname} />

      <div className='grid grid-cols-1'>
        <div className='flex flex-col'>
          <Topbar routes={routes} pathname={pathname} />
          <main className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
