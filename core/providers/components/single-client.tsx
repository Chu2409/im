import { Heading } from '@/core/shared/components/head/heading'
import { Separator } from '@/ui/separator'
import { Provider } from '@prisma/client'

export const ProviderClient = ({ provider }: { provider: Provider | null }) => {
  const description = provider ? 'Editar proveedor' : 'Agregar nueva proveedor'

  return (
    <>
      <Heading title='Proveedores' description={description} />

      <Separator className='my-1' />
    </>
  )
}
