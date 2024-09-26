'use client'

import { Header } from '@/core/shared/components/head/header'
import { recordsColumns } from './columns'
import { DataTable } from '@/core/shared/components/table/data-table'
import { IRecordWithItems } from '../types'
import { useRecord } from '../hooks/use-record'
import { itemsColumns } from '@/core/items/components/columns'
import { formatDate } from '@/lib/utils'

export const RecordsClient = ({ records }: { records: IRecordWithItems[] }) => {
  const currentRecord = useRecord((state) => state.record)

  return (
    <>
      <Header
        title='Registros'
        description='Administra los registros en tu laboratorio'
        buttonLabel='Nuevo registro'
      />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='order-2 lg:order-1'>
          <p className='text-sm text-muted-foreground '>
            Revise los registros de su laboratorio dando click
          </p>

          <DataTable data={records} columns={recordsColumns} />
        </div>

        <div className='order-1 lg:order-2'>
          {currentRecord && (
            <>
              <p className='text-sm'>
                Items del registro:{' '}
                <span className='capitalize font-semibold'>
                  {formatDate(currentRecord.date)}
                </span>
              </p>
              <DataTable data={currentRecord.items} columns={itemsColumns} />
            </>
          )}
        </div>
      </div>
    </>
  )
}
