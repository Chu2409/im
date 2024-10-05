'use client'

import { Header } from '@/core/shared/components/head/header'
import { DataTable } from '@/core/shared/components/table/data-table'
import { useProductModal } from '../hooks/use-product-modal'
import { productsColumns } from './columns'
import { ProductModal } from './modal'
import { CATEGORIES } from '../data/categories'
import { Product } from '@prisma/client'

const filters = [
  {
    key: 'category',
    values: Object.values(CATEGORIES).map((category) => ({
      value: category.id,
      label: category.name,
    })),
  },
]

export const ProductsClient = ({ products }: { products: Product[] }) => {
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
        statusColumn
        data={products}
        columns={productsColumns}
        inputFilterKey='name'
        filters={filters}
      />
    </>
  )
}
