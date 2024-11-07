import { IPaginationParams } from '@/core/shared/types/pagination'

export interface IAlertPaginationParams extends IPaginationParams {
  category?: string[] | string
  severity?: string[] | string
  type?: string[] | string
  status?: string[] | string
}
