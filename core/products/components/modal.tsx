import { Modal } from '@/core/shared/components/modal/modal'
import { useProductModal } from '../hooks/use-product-modal'
import { ProductForm } from './form'
import { Provider } from '@prisma/client'

export const ProductModal = ({ providers }: { providers: Provider[] }) => {
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
      className='max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-3xl'
    >
      <ProductForm
        initialData={initialData}
        onModalClose={onClose}
        providers={providers}
      />
    </Modal>
  )
}
