'use client'

import {
  CircleBackslashIcon,
  DotsHorizontalIcon,
  Pencil1Icon,
  ReloadIcon,
} from '@radix-ui/react-icons'

import { Button } from '@/core/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/core/shared/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { useToast } from '@/core/shared/hooks/use-toast'
import { useState } from 'react'
import { AlertModal } from '../../modal/alert-modal'

interface DataTableRowActionsProps {
  id: number
  status: boolean
  toggleStatus?: (id: number, status: boolean) => Promise<boolean | undefined>
  onEdit: () => void
}

export function DataTableRowActions({
  id,
  status,
  toggleStatus,
  onEdit,
}: DataTableRowActionsProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const description = status
    ? 'Desactivado correctamente'
    : 'Activado correctamente'

  const onDeleteClick = async () => {
    setIsLoading(true)

    const deleted = await toggleStatus!(id, !status)

    if (deleted) {
      toast({
        variant: 'success',
        title: 'Proceso exitoso',
        description,
      })

      router.refresh()
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
        onConfirm={onDeleteClick}
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

        <DropdownMenuContent align='end' className='w-[100px]'>
          <DropdownMenuItem
            className='flex items-center justify-between cursor-pointer'
            onClick={() => onEdit()}
          >
            Editar <Pencil1Icon />
          </DropdownMenuItem>

          {toggleStatus && (
            <>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className='flex items-center justify-between cursor-pointer'
                onClick={() => setIsOpen(true)}
              >
                {status ? (
                  <>
                    Desactivar <CircleBackslashIcon />
                  </>
                ) : (
                  <>
                    Activar <ReloadIcon />
                  </>
                )}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
