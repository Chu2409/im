import { Modal } from '@/core/shared/components/modal/modal'
import { useLocationModal } from '../hooks/use-location-modal'
import { LocationForm } from './form'

export const LocationModal = () => {
  const initialData = useLocationModal((state) => state.location)
  const isOpen = useLocationModal((state) => state.isOpen)
  const onClose = useLocationModal((state) => state.onClose)

  return (
    <Modal
      title={initialData ? 'Editar locación' : 'Nueva locación'}
      description={
        initialData ? 'Edita la locación' : 'Agrega una nueva locación'
      }
      isOpen={isOpen}
      onClose={onClose}
      className='max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-3xl'
    >
      <LocationForm initialData={initialData} onModalClose={onClose} />
    </Modal>
  )
}
