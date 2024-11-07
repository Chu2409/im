'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/paginated/data-table'
import { Provider } from '@prisma/client'
import { providersColumns } from './columns'
import { ProviderModal } from './modal'
import { useProviderModal } from '../hooks/use-provider-modal'
import { IPaginatedRes } from '@/core/shared/types/pagination'

export const ProvidersClient = ({
  data,
}: {
  data: IPaginatedRes<Provider> | undefined
}) => {
  const onOpen = useProviderModal((state) => state.onOpen)

  return (
    <>
      <Header
        title='Proveedores'
        description='Administra los proveedores de tus productos.'
        buttonLabel='Nuevo proveedor'
        onButtonClick={() => onOpen()}
      />

      <ProviderModal />

      <DataTable data={data} columns={providersColumns} inputFilterKey='name' />
    </>
  )
}
