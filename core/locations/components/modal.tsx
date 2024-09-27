import { Modal } from '@/core/shared/components/modal/modal'
import { useLocationrModal } from '../hooks/use-location-modal'
import { LocationForm } from './form'

export const LocationModal = () => {
  const initialData = useLocationrModal((state) => state.location)
  const isOpen = useLocationrModal((state) => state.isOpen)
  const onClose = useLocationrModal((state) => state.onClose)

  return (
    <Modal
      title={initialData ? 'Editar locación' : 'Nueva locación'}
      description={
        initialData ? 'Edita la locación' : 'Agrega una nueva locación'
      }
      isOpen={isOpen}
      onClose={onClose}
      className='max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl 2xl:max-w-4xl'
    >
      <LocationForm initialData={initialData} onModalClose={onClose} />
    </Modal>
  )
}
