'use client'

import {
  CircleBackslashIcon,
  DotsHorizontalIcon,
  ReloadIcon,
} from '@radix-ui/react-icons'

import { Button } from '@/core/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/shared/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { useToast } from '@/core/shared/hooks/use-toast'
import { useState } from 'react'
import { AlertModal } from '@/core/shared/components/modal/alert-modal'

interface DataTableRowActionsProps {
  id: number
  resolved: boolean
  toggleResolved?: (id: number, status: boolean) => Promise<boolean | undefined>
}

export function DataTableRowActions({
  id,
  resolved,
  toggleResolved,
}: DataTableRowActionsProps) {
  const { refresh } = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const description = resolved
    ? 'Se ha marcado como no resuelto'
    : 'Se ha marcado como resuelto'

  const onToggleResolvedClick = async () => {
    setIsLoading(true)

    const deleted = await toggleResolved!(id, !resolved)

    if (deleted) {
      toast({
        variant: 'success',
        title: 'Proceso exitoso',
        description,
      })

      refresh()
    } else {
      toast({
        variant: 'destructive',
        title: 'Algo salió mal',
        description: 'Intente de nuevo',
      })
    }

    setIsLoading(false)
    setIsOpen(false)
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onToggleResolvedClick}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Abrir menú</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end' className='w-[150px]'>
          <DropdownMenuItem
            className='flex items-center justify-between cursor-pointer'
            onClick={() => setIsOpen(true)}
          >
            {resolved ? (
              <>
                Marcar como no resuelto{' '}
                <CircleBackslashIcon className='w-6 h-6' />
              </>
            ) : (
              <>
                Marcar como resuelto <ReloadIcon className='w-6 h-6' />
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
