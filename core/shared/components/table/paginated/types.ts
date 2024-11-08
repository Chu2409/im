import { IOption } from '@/core/shared/types'

export interface IFilter {
  key: string
  values: IOption[]
  getById: (id: number) => IOption | undefined
}
