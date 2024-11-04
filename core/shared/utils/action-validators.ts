export const isValidField = (
  fieldName: string | undefined,
  modelFields: object,
) => {
  if (!fieldName) return false
  return Object.keys(modelFields).includes(fieldName)
}

export const isValidSortOrder = (sortOrder: string | undefined) => {
  if (!sortOrder) return false
  return ['asc', 'desc'].includes(sortOrder.toLowerCase())
}

export const getStatusWhere = (status?: string | string[]) => {
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
