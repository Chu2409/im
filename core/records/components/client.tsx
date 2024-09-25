import { Header } from '@/core/shared/components/head/header'
import { Record } from '@prisma/client'

export const RecordsClient = ({ records }: { records: Record[] }) => {
  return (
    <>
      <Header
        title='Registros'
        description='Administra los registros en tu laboratorio'
        buttonLabel='Nuevo registro'
      />

      {/* <DataTable
        data={records}
        columns={providersColumns}
        inputFilterKey='name'
      /> */}
    </>
  )
}
