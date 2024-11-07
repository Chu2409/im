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
    href: '/products?status=1',
    label: 'Productos',
    icon: <Tags />,
  },
  {
    href: '/providers?status=1',
    label: 'Proveedores',
    icon: <Truck />,
  },
  {
    href: '/locations?status=1',
    label: 'Locaciones',
    icon: <MapPinHouse />,
  },
]
