import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatDate = (date: Date) => {
  return format(date, 'MMMM dd, yyyy', { locale: es })
}

export const getEcuadorTimestamp = () => {
  return new Date()
    .toLocaleString('es-EC', {
      timeZone: 'America/Guayaquil',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
}
