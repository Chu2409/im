import { Modal } from '@/core/shared/components/modal/modal'
import { Provider } from '@prisma/client'
import { ProviderForm } from './form'

export const ProvidersModal = ({
  initialData,
  isOpen,
  onClose,
}: {
  initialData?: Provider
  isOpen: boolean
  onClose: () => void
}) => (
  <Modal
    title={initialData ? 'Editar proveedor' : 'Nuevo proveedor'}
    description={
      initialData ? 'Edita el proveedor' : 'Agrega un nuevo proveedor'
    }
    isOpen={isOpen}
    onClose={onClose}
  >
    <ProviderForm initialData={initialData} onModalClose={onClose} />
  </Modal>
)
