import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Input } from '@/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/ui/sheet'
import { CircleUser, Menu, Package2, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { IRoute } from '../../types'

export const Topbar = ({
  routes,
  pathname,
}: {
  routes: IRoute[]
  pathname: string
}) => {
  const [open, setIsOpen] = useState(false)

  return (
    <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      <Sheet open={open} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Habilitar menú de navegación</span>
          </Button>
        </SheetTrigger>

        <SheetContent side='left' className='flex flex-col'>
          <SheetHeader>
            <SheetTitle className='flex gap-4'>
              <Link
                href='#'
                className='flex items-center gap-3 text-lg font-semibold'
                onClick={() => setIsOpen(false)}
              >
                <Package2 className='h-6 w-6' />
                <span className='sr-only'>Acme Inc</span>
                Genomyc
              </Link>
            </SheetTitle>

            <SheetDescription className='flex'>
              Tu laboratorio de confianza
            </SheetDescription>
          </SheetHeader>

          <nav className='grid gap-2 text-lg font-medium'>
            {routes.map((route) => {
              const icon = route.icon

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
                    route.href === pathname && 'bg-muted text-foreground',
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <icon.type {...icon.props} className='h-5 w-5' />
                  {route.label}
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <div className='w-full flex-1'>
        <form>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Buscar producto...'
              className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-2/4'
            />
          </div>
        </form>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' size='icon' className='rounded-full'>
            <CircleUser className='h-5 w-5' />
            <span className='sr-only'>Habilitar menú de usuario</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className='cursor-pointer hover:bg-gray-50'>
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
