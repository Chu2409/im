import { ReadonlyURLSearchParams } from 'next/navigation'
import { IPaginationParams } from '../types/pagination'
import qs from 'query-string'

export const DEFAULT_PAGE_LIMIT = 10

export const getPaginationParams = (params: IPaginationParams) => {
  const page = Math.max(1, Number(params?.page) || 1)
  const size = Math.max(1, Number(params?.size) || DEFAULT_PAGE_LIMIT)
  const skip = (page - 1) * size

  return {
    skip,
    page,
    size,
  }
}

export const getStatusWhereCap = (status?: string | string[]) => {
  if (typeof status === 'string' && (status === '0' || status === '1')) {
    return {
      active: status === '1',
    }
  } else if (typeof status === 'object') {
    if (!status.every((sta) => sta === '0' || sta === '1')) {
      const auxStatus = status.find(
        (status) => status === '0' || status === '1',
      )

      return {
        active: auxStatus === '1',
      }
    }
  }
}

export function isValidField(
  fieldName: string | undefined,
  modelFields: object,
): boolean {
  if (!fieldName) return false
  return Object.keys(modelFields).includes(fieldName)
}

type SortOrder = 'asc' | 'desc'
export function isValidSortOrder(
  sortOrder: string | undefined,
): sortOrder is SortOrder {
  if (!sortOrder) return false
  return ['asc', 'desc'].includes(sortOrder.toLowerCase())
}

export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: ReadonlyURLSearchParams
  key: string
  value: string | null
}) {
  const currentUrl = qs.parse(params.toString())

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  )
}

export function formUrlQueryArray({
  params,
  key,
  value,
}: {
  params: ReadonlyURLSearchParams
  key: string
  value: string
}) {
  const currentUrl = qs.parse(params.toString())

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  currentUrl[key] = currentUrl[key] ? Array.of(currentUrl[key], value) : value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  )
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: {
  params: ReadonlyURLSearchParams
  keysToRemove: string[]
}) {
  const currentUrl = qs.parse(params.toString())

  keysToRemove.forEach((key) => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  )
}

export function removeKeyFromArrayQuery({
  params,
  keyToRemove,
  valueToRemove,
}: {
  params: ReadonlyURLSearchParams
  keyToRemove: string
  valueToRemove: string
}) {
  const currentUrl = qs.parse(params.toString())
  const values = currentUrl[keyToRemove]

  if (typeof values === 'string') {
    delete currentUrl[keyToRemove]
  }

  if (typeof values === 'object') {
    const newValues = values?.filter((value) => value !== valueToRemove)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    currentUrl[keyToRemove] = Array.of(newValues)
  }

  // keyToRemove.forEach((key) => {
  //   delete currentUrl[key]
  // })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  )
}
