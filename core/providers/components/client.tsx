'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/data-table'
import { Provider } from '@prisma/client'
import { providersColumns } from './columns'
import { ProvidersModal } from './modal'
import { useProviderModal } from '../hooks/use-provider-modal'

export const ProvidersClient = ({ providers }: { providers: Provider[] }) => {
  const onOpen = useProviderModal((state) => state.onOpen)

  return (
    <>
      <Header
        title='Proveedores'
        description='Administra los proveedores de tus productos.'
        buttonLabel='Nuevo proveedor'
        onButtonClick={() => onOpen()}
      />

      <ProvidersModal />

      <DataTable
        data={providers}
        columns={providersColumns}
        inputFilterKey='name'
      />
    </>
  )
}
