import { Product } from '@prisma/client'
import { create } from 'zustand'

interface ProductModalState {
  isOpen: boolean
  onOpen: (provider?: Product) => void
  product?: Product
  onClose: () => void
}

export const useProductModal = create<ProductModalState>((set) => ({
  isOpen: false,
  onOpen: (product) => set({ product, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
