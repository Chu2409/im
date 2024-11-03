export interface IPaginationParams {
  page?: string
  limit?: string
  search?: string
  sort?: string
  order?: string
}

export interface ISearchParams<T> {
  searchParams: Promise<T>
}
