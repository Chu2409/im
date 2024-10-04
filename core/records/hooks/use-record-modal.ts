import { create } from 'zustand'

interface RecordModalState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useRecordModal = create<RecordModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
