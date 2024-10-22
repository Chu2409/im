import { create } from 'zustand'
import { IFullLot } from '../types'

interface LotModalState {
  isOpen: boolean
  onOpen: (lot?: IFullLot) => void
  lot?: IFullLot
  onClose: () => void
}

export const useLotModal = create<LotModalState>((set) => ({
  isOpen: false,
  onOpen: (lot) => set({ lot, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
