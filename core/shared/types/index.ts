export interface IRoute {
  href: string
  label: string
  icon: React.ReactElement
}

export interface IOption {
  id: number
  label: string
}

export interface IConstant extends IOption {
  color: string
}

export interface IDataTableFilter {
  key: string
  values: IOption[]
}

export interface IDatTablePaginatedFilter {
  key: string
  values: IOption[]
  getById: (id: number) => IOption | undefined
}
