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
