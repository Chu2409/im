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

interface DataTableRowActionsProps {
  id: number
  onDelete: (id: number) => Promise<boolean>
  path: string
}

export function DataTableRowActions({
  id,
  onDelete,
  path,
}: DataTableRowActionsProps) {
  const router = useRouter()

  const handleEditClick = () => {
    router.push(`${path}/${id}`)
  }

  const handleDeleteClick = async () => {
    try {
      await onDelete(id)

      router.refresh()
    } catch (error) {}
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
