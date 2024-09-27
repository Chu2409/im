'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/data-table'
import { Provider } from '@prisma/client'
import { providersColumns } from './columns'
import { ProvidersModal } from './modal'
import { useState } from 'react'

export const ProvidersClient = ({ providers }: { providers: Provider[] }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Header
        title='Proveedores'
        description='Administra los proveedores de tus productos.'
        buttonLabel='Nuevo proveedor'
        onButtonClick={() => setIsOpen(true)}
      />

      <ProvidersModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <DataTable
        data={providers}
        columns={providersColumns}
        inputFilterKey='name'
      />
    </>
  )
}
