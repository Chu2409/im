import { IPaginationParams } from '@/core/shared/types/pagination'

export interface ILocationPaginationParams extends IPaginationParams {
  status?: string[] | string
  laboratory?: string
}
