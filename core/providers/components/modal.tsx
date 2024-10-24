import { Modal } from '@/core/shared/components/modal/modal'
import { ProviderForm } from './form'
import { useProviderModal } from '../hooks/use-provider-modal'

export const ProviderModal = () => {
  const initialData = useProviderModal((state) => state.provider)
  const isOpen = useProviderModal((state) => state.isOpen)
  const onClose = useProviderModal((state) => state.onClose)

  return (
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
}
