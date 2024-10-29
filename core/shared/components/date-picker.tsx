'use client'

import { Calendar as CalendarIcon } from 'lucide-react'

import { cn, formatDate } from '@/core/shared/utils/utils'
import { Button } from '@/core/shared/ui/button'
import { Calendar } from '@/core/shared/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/core/shared/ui/popover'

interface DatePickerProps {
  value?: Date
  onChange: (date?: Date) => void
  disabled?: boolean
  className?: string
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabled,
  className,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {value ? (
            <span className='capitalize'>{formatDate(value)}</span>
          ) : (
            <span>Selecciona una fecha</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align='start'>
        <Calendar
          mode='single'
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
