import { Modal } from '@/core/shared/components/modal/modal'
import { useLotModal } from '../hooks/use-lot-modal'
import { Location, Product, Provider } from '@prisma/client'
import { LotForm } from './form'

export const LotModal = ({
  locations,
  products,
  providers,
}: {
  locations: Location[]
  products: Product[]
  providers: Provider[]
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
    >
      <LotForm
        initialData={initialData}
        locations={locations}
        onModalClose={onClose}
        products={products}
        providers={providers}
      />
    </Modal>
  )
}
