import { IOption } from '@/core/shared/types'

export interface IFilter {
  key: string
  values: IOption<number>[]
}
