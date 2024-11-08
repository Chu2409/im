import { Modal } from '@/core/shared/components/modal/modal'
import { useLotModal } from '../hooks/use-lot-modal'
import { LotForm } from './form/form'

export const LotModal = () => {
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
      <LotForm initialData={initialData} onModalClose={onClose} />
    </Modal>
  )
}
