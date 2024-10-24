import { Location } from '@prisma/client'
import { create } from 'zustand'

interface LocationModalState {
  isOpen: boolean
  onOpen: (location?: Location) => void
  location?: Location
  onClose: () => void
}

export const useLocationModal = create<LocationModalState>((set) => ({
  isOpen: false,
  onOpen: (location) => set({ location, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
