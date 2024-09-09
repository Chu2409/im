import { Boxes, FileText, MapPinHouse, Tags, Truck } from 'lucide-react'
import { IRoute } from '../types'

export const routes: IRoute[] = [
  {
    href: '/products',
    label: 'Productos',
    icon: <Tags />,
  },
  {
    href: '/inventory',
    label: 'Inventario',
    icon: <Boxes />,
  },
  {
    href: '/records',
    label: 'Registros',
    icon: <FileText />,
  },
  {
    href: '/providers',
    label: 'Proveedores',
    icon: <Truck />,
  },
  {
    href: '/locations',
    label: 'Locaciones',
    icon: <MapPinHouse />,
  },
]
