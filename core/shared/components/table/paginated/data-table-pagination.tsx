import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import { Button } from '@/core/shared/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/shared/ui/select'
import { IMetadata } from '@/core/shared/types/pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery } from '@/core/shared/utils/pagination'

interface DataTablePaginationProps {
  metadata: IMetadata | undefined
}

export function DataTablePagination({ metadata }: DataTablePaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePagination = (page: number) => {
    const newUrl = formUrlQuery({
      key: 'page',
      value: page.toString(),
      params: searchParams,
    })

    router.push(newUrl)
  }

  const handlePageSize = (size: number) => {
    const newUrl = formUrlQuery({
      key: 'size',
      value: size.toString(),
      params: searchParams,
    })

    router.push(newUrl)
  }

  return (
    <div className='flex items-center justify-end gap-x-4 lg:gap-x-6 flex-wrap gap-2'>
      <div className='flex items-center space-x-2'>
        <p className='text-sm font-medium'>Items por página</p>

        <Select
          value={`${metadata?.size}`}
          onValueChange={(value) => {
            handlePageSize(Number(value))
          }}
        >
          <SelectTrigger className='h-8 w-[70px]'>
            <SelectValue placeholder={metadata?.size} />
          </SelectTrigger>

          <SelectContent side='top'>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
        {`Página ${metadata?.currentPage} de ${metadata?.totalPages}`}
      </div>

      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => handlePagination(metadata!.currentPage - 1)}
          disabled={!metadata?.hasPreviousPage}
        >
          <span className='sr-only'>Ir a la anterior página</span>
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>

        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => handlePagination(metadata!.currentPage + 1)}
          disabled={!metadata?.hasNextPage}
        >
          <span className='sr-only'>Ir a la siguiente página</span>
          <ChevronRightIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
