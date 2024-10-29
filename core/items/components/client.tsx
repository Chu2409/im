'use client'

import { IRecordWithItems } from '@/core/records/types'
import { itemsColumns } from './columns'
import { DataTable } from '@/core/shared/components/table/data-table'

import { formatDate } from '@/core/shared/utils/utils'

export const ItemsClient = ({ record }: { record?: IRecordWithItems }) => {
  return (
    <>
      {record && (
        <>
          <p className='text-sm'>
            Items del registro:{' '}
            <span className='capitalize font-semibold'>
              {formatDate(record.start)} -{' '}
            </span>
            <span className='capitalize font-semibold'>
              {formatDate(record.end)}
            </span>
          </p>

          <DataTable
            data={record.items}
            columns={itemsColumns}
            statusColumn={false}
            viewOptions={false}
          />
        </>
      )}
    </>
  )
}
