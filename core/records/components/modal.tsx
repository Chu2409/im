import { Modal } from '@/core/shared/components/modal/modal'
import { useRecordModal } from '../hooks/use-record-modal'
import { useRecord } from '../hooks/use-record'
import { RecordForm } from './form'

export const RecordModal = () => {
  const initialData = useRecord((state) => state.record)
  const isOpen = useRecordModal((state) => state.isOpen)
  const onClose = useRecordModal((state) => state.onClose)

  return (
    <Modal
      title={initialData ? 'Editar registro' : 'Nuevo registro'}
      description={
        initialData ? 'Edita el registro' : 'Agrega un nuevo registro'
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <RecordForm initialData={initialData} onModalClose={onClose} />
    </Modal>
  )
}
