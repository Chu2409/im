import { IRecordWithItems } from '../types'
import { create } from 'zustand'

interface RecordState {
  record: IRecordWithItems | null
  setRecord: (record: IRecordWithItems) => void
}

// const initialState: IRecordWithItems = {
//   id: 0,
//   date: new Date(),
//   items: [],
// }

export const useRecord = create<RecordState>((set) => ({
  record: null,
  setRecord: (record) => set({ record }),
}))
