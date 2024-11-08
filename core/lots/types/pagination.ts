import { IPaginationParams } from '@/core/shared/types/pagination'

export interface IInventoryPaginationParams extends IPaginationParams {
  category?: string[] | string
}
