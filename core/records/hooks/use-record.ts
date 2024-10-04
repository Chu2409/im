import { IRecordWithItems } from '../types'
import { create } from 'zustand'

interface RecordState {
  record?: IRecordWithItems
  setRecord: (record?: IRecordWithItems) => void
}

export const useRecord = create<RecordState>((set) => ({
  setRecord: (record) => set({ record }),
}))
