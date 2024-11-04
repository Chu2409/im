export interface IRoute {
  href: string
  label: string
  icon: React.ReactElement
}

export interface IConstant {
  id: number
  name: string
  color: string
}

export interface IOption<T> {
  label: string
  value: T
}
