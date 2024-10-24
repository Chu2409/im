import { Modal } from '@/core/shared/components/modal/modal'
import { useProductModal } from '../hooks/use-product-modal'
import { ProductForm } from './form'

export const ProductModal = () => {
  const initialData = useProductModal((state) => state.product)
  const isOpen = useProductModal((state) => state.isOpen)
  const onClose = useProductModal((state) => state.onClose)

  return (
    <Modal
      title={initialData ? 'Editar producto' : 'Nuevo producto'}
      description={
        initialData ? 'Edita el producto' : 'Agrega un nuevo producto'
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <ProductForm initialData={initialData} onModalClose={onClose} />
    </Modal>
  )
}
