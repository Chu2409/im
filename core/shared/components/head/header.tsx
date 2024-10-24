import { Plus } from 'lucide-react'
import { Separator } from '@/ui/separator'
import { Heading } from './heading'
import { Button } from '@/ui/button'

interface HeaderProps {
  title: string
  description: string
  buttonLabel?: string
  onButtonClick?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  title,
  description,
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <>
      <div className='flex items-center justify-between gap-4 w-full'>
        <Heading title={title} description={description} />

        {onButtonClick && buttonLabel && (
          <Button
            className='flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-70 cursor-pointer text-center'
            onClick={onButtonClick}
          >
            <Plus className='mr-2 h-4 w-4' />

            {buttonLabel}
          </Button>
        )}
      </div>

      <Separator className='my-1' />
    </>
  )
}
