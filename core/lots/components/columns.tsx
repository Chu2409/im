'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IFullLot } from '../types'

export const lotColumns: ColumnDef<IFullLot>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  // {
  //   accessorKey: 'status',
  //   meta: 'Estado',
  //   header: '',
  //   cell: ({ row }) => !row.original.active && <InactiveIndicator />,
  //   filterFn: (row, id, filterValue) => {
  //     const value = row.original.active ? 1 : 0
  //     return filterValue.includes(value)
  //   },
  // },
  // {
  //   accessorKey: 'code',
  //   header: 'Código',
  // },
  // {
  //   accessorKey: 'laboratory',
  //   filterFn: (row, id, filterValue) => {
  //     const laboratory = getLaboratoryByName(row.original.laboratory)
  //     return filterValue.includes(laboratory?.id)
  //   },
  //   meta: 'Laboratorio',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Laboratorio' />
  //   ),
  //   cell: ({ row }) => {
  //     const laboratory = getLaboratoryByName(row.original.laboratory)

  //     return (
  //       <Badge
  //         variant='outline'
  //         className='text-white'
  //         style={{
  //           backgroundColor: laboratory?.color,
  //           border: laboratory?.color,
  //         }}
  //       >
  //         {laboratory?.name}
  //       </Badge>
  //     )
  //   },
  // },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     const onOpen = useLocationModal((state) => state.onOpen)

  //     return (
  //       <DataTableRowActions
  //         id={row.original.id}
  //         status={row.original.active}
  //         toggleStatus={toggleLocationStatus}
  //         onEdit={() => onOpen(row.original)}
  //       />
  //     )
  //   },
  // },
]
