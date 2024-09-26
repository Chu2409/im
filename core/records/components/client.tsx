import { Header } from '@/core/shared/components/head/header'
import { recordsColumns } from './columns'
import { DataTable } from '@/core/shared/components/table/data-table'
import { IRecordWithItems } from '../types'

export const RecordsClient = ({ records }: { records: IRecordWithItems[] }) => {
  return (
    <>
      <Header
        title='Registros'
        description='Administra los registros en tu laboratorio'
        buttonLabel='Nuevo registro'
      />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='order-2 lg:order-1'>
          <DataTable data={records} columns={recordsColumns} />
        </div>

        <div className='order-1 lg:order-2'>Probando</div>
      </div>
    </>
  )
}
