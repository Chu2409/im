'use client'

import { Header } from '@/core/shared/components/head/header'
import { recordsColumns } from './columns'
import { DataTable } from '@/core/shared/components/table/paginated/data-table'
import { IRecordWithItems } from '../types'
import { useRecord } from '../hooks/use-record'
import { RecordModal } from './modal'
import { useRecordModal } from '../hooks/use-record-modal'
import { ItemsClient } from '@/core/items/components/client'
import { IPaginatedRes } from '@/core/shared/types/pagination'

export const RecordsClient = ({
  data,
}: {
  data: IPaginatedRes<IRecordWithItems> | undefined
}) => {
  const currentRecord = useRecord((state) => state.record)
  const setRecord = useRecord((state) => state.setRecord)
  const onOpen = useRecordModal((state) => state.onOpen)

  const handleClick = () => {
    setRecord(undefined)
    onOpen()
  }

  return (
    <>
      <Header
        title='Registros'
        description='Administra los registros en tu laboratorio'
        buttonLabel='Nuevo registro'
        onButtonClick={handleClick}
      />

      <RecordModal />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='order-2 lg:order-1'>
          <p className='text-sm text-muted-foreground '>
            Revise los registros de su laboratorio dando click
          </p>

          <DataTable
            data={data}
            columns={recordsColumns}
            enableViewOptions={false}
          />
        </div>

        <div className='order-1 lg:order-2'>
          <ItemsClient record={currentRecord} />
        </div>
      </div>
    </>
  )
}
