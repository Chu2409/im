'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/paginated/data-table'
import { useProductModal } from '../hooks/use-product-modal'
import { productsColumns } from './columns'
import { ProductModal } from './modal'
import { Product } from '@prisma/client'
import { IPaginatedRes } from '@/core/shared/types/pagination'
import { productFilters } from '../data/filters'

export const ProductsClient = ({
  data,
}: {
  data: IPaginatedRes<Product> | undefined
}) => {
  const onOpen = useProductModal((state) => state.onOpen)

  return (
    <>
      <Header
        title='Productos'
        description='Administra los productos de tu laboratorio'
        buttonLabel='Nuevo producto'
        onButtonClick={() => onOpen()}
      />

      <ProductModal />

      <DataTable
        data={data}
        columns={productsColumns}
        inputFilterKey='name'
        filters={productFilters}
      />
    </>
  )
}
