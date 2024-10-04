import { create } from 'zustand'
import { IProductWithProviders } from '../types'

interface ProductModalState {
  isOpen: boolean
  onOpen: (provider?: IProductWithProviders) => void
  product?: IProductWithProviders
  onClose: () => void
}

export const useProductModal = create<ProductModalState>((set) => ({
  isOpen: false,
  onOpen: (product) => set({ product, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
