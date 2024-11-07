'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/test/data-table'
import { useProductModal } from '../hooks/use-product-modal'
import { productsColumns } from './columns'
import { ProductModal } from './modal'
import { CATEGORIES, getCategoryById } from '../data/categories'
import { Product } from '@prisma/client'
import { IPaginatedRes } from '@/core/shared/types/pagination'

const filters = [
  {
    key: 'category',
    values: Object.values(CATEGORIES).map((category) => ({
      id: category.id,
      label: category.name,
    })),
    getById: getCategoryById,
  },
]

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
        filters={filters}
      />
    </>
  )
}
