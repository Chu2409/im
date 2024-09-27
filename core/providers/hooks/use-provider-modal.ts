import { Provider } from '@prisma/client'
import { create } from 'zustand'

interface ProviderModalState {
  isOpen: boolean
  onOpen: (provider?: Provider) => void
  provider?: Provider
  onClose: () => void
}

export const useProviderModal = create<ProviderModalState>((set) => ({
  isOpen: false,
  onOpen: (provider) => set({ provider, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
