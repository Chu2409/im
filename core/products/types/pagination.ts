import { IPaginationParams } from '@/core/shared/types/pagination'

export interface IProductPaginationParams extends IPaginationParams {
  status?: string[] | string
  category?: string[] | string
}
