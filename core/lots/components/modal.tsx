import { Modal } from '@/core/shared/components/modal/modal'
import { useLotModal } from '../hooks/use-lot-modal'
import { Location, Product } from '@prisma/client'
import { LotForm } from './form'

export const LotModal = ({
  locations,
  products,
}: {
  locations: Location[]
  products: Product[]
}) => {
  const initialData = useLotModal((state) => state.lot)
  const isOpen = useLotModal((state) => state.isOpen)
  const onClose = useLotModal((state) => state.onClose)

  return (
    <Modal
      title={initialData ? 'Editar lote' : 'Nuevo lote'}
      description={initialData ? 'Edita el lote' : 'Agrega un nuevo lote'}
      isOpen={isOpen}
      onClose={onClose}
      className='max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto'
    >
      <LotForm
        initialData={initialData}
        locations={locations}
        onModalClose={onClose}
        products={products}
      />
    </Modal>
  )
}
