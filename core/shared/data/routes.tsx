import {
  Boxes,
  CircleAlert,
  FileText,
  MapPinHouse,
  Tags,
  Truck,
} from 'lucide-react'
import { IRoute } from '../types'

export const routes: IRoute[] = [
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
    href: '/alerts',
    label: 'Alertas',
    icon: <CircleAlert />,
  },
  {
    href: '/products',
    label: 'Productos',
    icon: <Tags />,
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
