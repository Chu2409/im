import { Heading } from '@/core/shared/components/head/heading'
import { Separator } from '@/ui/separator'
import { Location } from '@prisma/client'
import { LocationForm } from './form'

export const LocationClient = ({ location }: { location: Location | null }) => {
  const description = location ? 'Editar locación' : 'Agregar nueva locación'

  return (
    <>
      <Heading title='Locaciones' description={description} />

      <Separator className='my-1' />

      <LocationForm initialData={location} />
    </>
  )
}
