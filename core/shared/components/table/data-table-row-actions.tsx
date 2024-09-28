'use client'

import {
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons'

import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { AlertModal } from '../modal/alert-modal'

interface DataTableRowActionsProps {
  id: number
  onDelete?: (id: number) => Promise<boolean>
  deleteMessage?: string
  errorMessage?: string
  onEdit: () => void
}

export function DataTableRowActions({
  id,
  onDelete,
  deleteMessage,
  errorMessage,
  onEdit,
}: DataTableRowActionsProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onDeleteClick = async () => {
    setIsLoading(true)

    const deleted = await onDelete!(id)

    if (deleted) {
      toast({
        variant: 'success',
        title: 'Eliminado correctamente',
        description: deleteMessage || 'El elemento ha sido eliminado',
      })

      router.refresh()
    } else {
      toast({
        variant: 'destructive',
        title: 'Algo salió mal',
        description:
          errorMessage || 'El elemento no pudo ser eliminado correctamente',
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

          {onDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='flex items-center justify-between cursor-pointer'
                onClick={() => setIsOpen(true)}
              >
                Eliminar <TrashIcon />
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
