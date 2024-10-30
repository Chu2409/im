import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatDate = (date: Date) => {
  return format(date, 'MMMM dd, yyyy', { locale: es })
}
