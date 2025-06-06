'use client'

import { cn } from '@/core/shared/utils/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/core/shared/ui/dialog'

interface ModalProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  className?: string
  children?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  className,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent
        className={cn(
          className ||
            'min-w-[90%] md:min-w-[80%] lg:min-w-[75%] xl:min-w-[70%] 2xl:min-w-[65%] max max-h-[90vh] overflow-y-auto',
        )}
      >
        <DialogHeader className='text-left'>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
