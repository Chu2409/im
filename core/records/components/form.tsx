'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/shared/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/core/shared/ui/button'
import { useState } from 'react'
import { IRecordWithItems, IUpsertProductBulkProps } from '../types'
import { ItemFormDataTable } from '@/core/items/components/form-data-table'
import { ItemSelector } from '@/core/items/components/item-selector'
import { createRecordWithItems } from '../actions/create-record-with-items'
import { updateRecordWithItems } from '../actions/update-record-with-items'
import { IEditableRowItem } from '@/core/items/types'
import { IFullLotLocation } from '@/core/lots/types'
import { DatePicker } from '@/core/shared/components/date-picker'
import useFormSubmit from '@/core/shared/hooks/use-form-submit'
import { Record } from '@prisma/client'

const formSchema = z.object({
  start: z.date({ message: 'Seleccione una fecha de inicio' }),
  end: z.date({ message: 'Seleccione una fecha de fin' }),
})

type formType = z.infer<typeof formSchema>

export const RecordForm = ({
  initialData,
  lotProducts,
  onModalClose,
}: {
  initialData?: IRecordWithItems
  lotProducts: IFullLotLocation[]
  onModalClose: () => void
}) => {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start: initialData?.start,
      end: initialData?.end,
    },
  })

  const action = initialData ? 'Actualizar registro' : 'Crear registro'
  const toastTitle = initialData ? 'Registro actualizado' : 'Registro creado'
  const toastDescription = initialData
    ? 'El registro ha sido actualizado correctamente'
    : 'El registro ha sido creado correctamente'

  const [itemsTable, setItemsTable] = useState<IEditableRowItem[]>(
    () =>
      initialData?.items.map((item) => ({
        lotLocation: {
          id: item.lotLocationId,
          productId: item.lotLocation.lot.product.id,
          productName: item.lotLocation.lot.product.name,
          lotId: item.lotLocation.lotId,
          laboratory: item.lotLocation.location.laboratory,
          maxQuantity: item.lotLocation.stock,
        },
        quantity: { value: item.quantity },
        isSaved: true,
        toDelete: false,
        toEdit: {
          value: false,
          oldQuantity: item.quantity,
        },
      })) || [],
  )

  const { onSubmit, isLoading } = useFormSubmit<
    Record,
    IUpsertProductBulkProps
  >({
    initialData,
    createFn: createRecordWithItems,
    updateFn: updateRecordWithItems,
    toastTitle,
    toastDescription,
    onModalClose,
  })

  const handleSubmit = async (values: formType) =>
    await onSubmit(
      {
        ...values,
        items: itemsTable,
      },
      form,
    )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex flex-col gap-6'
        id='form'
      >
        <div className='grid lg:grid-cols-2 gap-4'>
          <div className='grid gap-3 max-lg:mb-8'>
            <FormField
              control={form.control}
              name='start'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de inicio</FormLabel>
                  <FormControl>
                    <DatePicker
                      disabled={isLoading}
                      value={field.value}
                      // eslint-disable-next-line react/jsx-handler-names
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='end'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de fin</FormLabel>
                  <FormControl>
                    <DatePicker
                      disabled={isLoading}
                      value={field.value}
                      // eslint-disable-next-line react/jsx-handler-names
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ItemSelector
              lotLocations={lotProducts}
              onAdd={(id) => {
                const lotLocation = lotProducts.find(
                  (lotLocation) => lotLocation.id === id,
                )

                if (lotLocation) {
                  const updatedItemsTable = itemsTable.concat({
                    lotLocation: {
                      id: lotLocation.id,
                      productName: lotLocation.lot.product.name,
                      lotId: lotLocation.lotId,
                      laboratory: lotLocation.location.laboratory,
                      maxQuantity: lotLocation.stock,
                    },
                    quantity: { value: 1 },
                    isSaved: false,
                    toDelete: false,
                    toEdit: { value: false, oldQuantity: 0 },
                  })
                  setItemsTable(updatedItemsTable)
                }
              }}
              values={itemsTable.map(
                (item) =>
                  `${item.lotLocation.id}@${item.lotLocation.productName}`,
              )}
            />
          </div>

          <ItemFormDataTable
            data={itemsTable}
            onDelete={(isSaved, id) => {
              if (isSaved) {
                const updatedItemsTable = itemsTable.map((itemTable) => {
                  if (itemTable.lotLocation.id === id)
                    return {
                      ...itemTable,
                      toDelete: itemTable.toDelete ? !itemTable.toDelete : true,
                    }

                  return itemTable
                })
                setItemsTable(updatedItemsTable)
              } else {
                const updatedItemsTable = itemsTable.filter(
                  (item) => item.lotLocation.id !== id,
                )
                setItemsTable(updatedItemsTable)
              }
            }}
            onQuantityBlur={(isSaved, id, quantity) => {
              const updatedItemsTable = itemsTable.map((itemTable) => {
                if (itemTable.lotLocation.id === id)
                  return {
                    ...itemTable,
                    quantity: { value: quantity, isEdited: !!isSaved },
                    toEdit: {
                      value: !!isSaved,
                      oldQuantity: itemTable.toEdit.oldQuantity,
                    },
                  }

                return itemTable
              })
              setItemsTable(updatedItemsTable)
            }}
          />
        </div>

        <div className='ml-auto'>
          <Button
            type='submit'
            disabled={isLoading}
            form='form'
            className='px-6'
          >
            {action}
          </Button>
        </div>
      </form>
    </Form>
  )
}
