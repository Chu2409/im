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

interface DataTableRowActionsProps {
  id: number
  onDelete: (id: number) => Promise<boolean>
  deleteMessage?: string
  path: string
}

export function DataTableRowActions({
  id,
  onDelete,
  deleteMessage,
  path,
}: DataTableRowActionsProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleEditClick = () => {
    router.push(`${path}/${id}`)
  }

  const handleDeleteClick = async () => {
    const deleted = await onDelete(id)

    if (deleted) {
      toast({
        title: 'Eliminado correctamente',
        description: deleteMessage || 'El elemento ha sido eliminado',
      })

      router.refresh()
    } else {
      toast({
        variant: 'destructive',
        title: 'Algo salió mal',
        description: 'El elemento no pudo ser eliminado correctamente',
      })
    }
  }

  return (
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
          onClick={handleEditClick}
        >
          Editar <Pencil1Icon />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='flex items-center justify-between cursor-pointer'
          onClick={handleDeleteClick}
        >
          Eliminar <TrashIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
