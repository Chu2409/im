import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/data-table'
import { Provider } from '@prisma/client'
import { providersColumns } from './columns'

export const ProvidersClient = ({ providers }: { providers: Provider[] }) => {
  return (
    <>
      <Header
        title='Proveedores'
        description='Administra los proveedores de tus productos.'
        buttonLabel='Nuevo proveedor'
      />

      <DataTable
        data={providers}
        columns={providersColumns}
        inputFilterKey='name'
      />
    </>
  )
}
