import Link from 'next/link'
import { IRoute } from '../../types'
import { cn } from '@/core/shared/utils/utils'
import { IconSvg } from './icon'

export const Sidebar = ({
  routes,
  pathname,
}: {
  routes: IRoute[]
  pathname: string
}) => {
  return (
    <div className='hidden border-r bg-muted/40 md:block space-y-2'>
      <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
        <Link
          href='/inventory'
          className='flex items-center gap-3 font-semibold'
        >
          <IconSvg className='w-8 h-8' />
          <span className=''>Genomyc</span>
        </Link>
      </div>

      <div className='flex-1'>
        <nav className='grid items-start px-2 text-sm font-medium lg:px-4 gap-y-2'>
          {routes.map((route) => {
            const icon = route.icon

            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  route.href.split('?')[0] === pathname &&
                    'bg-muted text-primary',
                )}
              >
                <icon.type {...icon.props} className='h-5 w-5' />
                {route.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
