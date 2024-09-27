import { Location } from '@prisma/client'
import { create } from 'zustand'

interface LocationModalState {
  isOpen: boolean
  onOpen: (location?: Location) => void
  location?: Location
  onClose: () => void
}

export const useLocationrModal = create<LocationModalState>((set) => ({
  isOpen: false,
  onOpen: (provider) => set({ location: provider, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
