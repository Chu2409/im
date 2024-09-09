'use client'

import { Location } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

export const locationColumns: ColumnDef<Location>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'code',
    header: 'Code',
  },
  {
    accessorKey: 'laboratory',
    header: 'Laboratorio',
  },
]
