import { Header } from '@/core/shared/components/head/header'
import { Record } from '@prisma/client'
import { recordsColumns } from './columns'
import { DataTable } from '@/core/shared/components/table/data-table'

export const RecordsClient = ({ records }: { records: Record[] }) => {
  return (
    <>
      <Header
        title='Registros'
        description='Administra los registros en tu laboratorio'
        buttonLabel='Nuevo registro'
      />

      <DataTable data={records} columns={recordsColumns} />
    </>
  )
}
