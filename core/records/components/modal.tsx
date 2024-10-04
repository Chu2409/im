import { Modal } from '@/core/shared/components/modal/modal'
import { useRecordModal } from '../hooks/use-record-modal'
import { useRecord } from '../hooks/use-record'
import { RecordForm } from './form'
import { Product } from '@prisma/client'

export const RecordModal = ({ products }: { products: Product[] }) => {
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
      className='max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto'
    >
      <RecordForm
        initialData={initialData}
        products={products}
        onModalClose={onClose}
      />
    </Modal>
  )
}
