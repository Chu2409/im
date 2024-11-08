export interface ISearchParams<T> {
  searchParams: Promise<T>
}
export interface IPaginationParams {
  page?: string
  size?: string
  search?: string
  sort?: string
  order?: string
}

export interface IMetadata {
  total: number
  size: number
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface IPaginatedRes<T> {
  data: T[]
  metadata: IMetadata
}
