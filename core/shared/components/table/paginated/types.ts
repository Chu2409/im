import { IConstant, IOption } from '@/core/shared/types'

export interface IFilter {
  key: string
  values: IOption<number>[]
  getById: (id: number) => IConstant | undefined
}
