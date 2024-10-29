import { EXP_DAYS_LIMITS, RESTOCK_LIMITS } from '../data/limits'
import { SEVERITIES } from '../data/severities'
import { TYPES } from '../data/types'

export const calculateSeverity = (
  type: (typeof TYPES)[keyof typeof TYPES],
  value: number,
): (typeof SEVERITIES)[keyof typeof SEVERITIES] => {
  if (type === TYPES.RESTOCK) {
    if (value <= RESTOCK_LIMITS.MIN) return SEVERITIES.HIGH
    if (value <= RESTOCK_LIMITS.MEDIUM) return SEVERITIES.MEDIUM
    return SEVERITIES.LOW
  }

  if (value <= EXP_DAYS_LIMITS.MIN) return SEVERITIES.HIGH
  if (value <= EXP_DAYS_LIMITS.MEDIUM) return SEVERITIES.MEDIUM
  return SEVERITIES.LOW
}

export const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(date.getDate() + days)
  return result
}

export const getDaysDifference = (date1: Date, date2: Date) => {
  const timeDiff = date1.getTime() - date2.getTime()
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}
