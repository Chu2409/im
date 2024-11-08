import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons'

import { cn } from '@/core/shared/utils/utils'
import { Button } from '@/core/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/shared/ui/dropdown-menu'
import { HTMLAttributes } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQueryFromArray } from '@/core/shared/utils/pagination'

interface DataTableColumnHeaderProps extends HTMLAttributes<HTMLDivElement> {
  sort: string
  title: string
}

export function DataTableColumnHeader({
  sort,
  title,
  className,
}: DataTableColumnHeaderProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const order = searchParams.get('order')
  const sortParam = searchParams.get('sort')

  const handleSort = (order: string) => {
    const url = formUrlQueryFromArray({
      params: searchParams,
      values: [
        {
          key: 'sort',
          value: sort,
        },
        {
          key: 'order',
          value: order,
        },
      ],
    })

    router.push(url, { scroll: false })
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='-ml-3 h-8 data-[state=open]:bg-accent'
          >
            <span className='text-sm'>{title}</span>

            {order === 'desc' && sortParam === sort ? (
              <ArrowDownIcon className='ml-2 h-4 w-4' />
            ) : order === 'asc' && sortParam === sort ? (
              <ArrowUpIcon className='ml-2 h-4 w-4' />
            ) : (
              <CaretSortIcon className='ml-2 h-4 w-4' />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='start'>
          <DropdownMenuItem
            onClick={() => handleSort('asc')}
            className='cursor-pointer'
          >
            <ArrowUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Asc
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleSort('desc')}
            className='cursor-pointer'
          >
            <ArrowDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
