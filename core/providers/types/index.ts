import { IPaginationParams } from '@/core/shared/types/pagination'

export interface IProviderPaginationParams extends IPaginationParams {
  status?: string[] | string
}
