import { create } from 'zustand'

interface InventoryModalState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useInventoryModal = create<InventoryModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
