'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { IFullLotLocation, IFullLot } from '../types'
import { Input } from '@/ui/input'
import { ItemFormDataTable } from '@/core/items/components/form-data-table'
import { ItemSelector } from '@/core/items/components/item-selector'
import { IEditableRowItem } from '@/core/items/types'
import { Location } from '@prisma/client'

const formSchema = z.object({
  start: z.string(),
  end: z.string(),
})

type formType = z.infer<typeof formSchema>

export const LotForm = ({
  initialData,
  locations,
  onModalClose,
}: {
  initialData?: IFullLot
  locations: Location[]
  onModalClose: () => void
}) => {
  const toastTitle = initialData ? 'Registro actualizado' : 'Registro creado'
  const toastDescription = initialData
    ? 'El registro ha sido actualizado correctamente'
    : 'El registro ha sido creado correctamente'
  const errorMessage = initialData
    ? 'Hubo un error al actualizar el registro'
    : 'Hubo un error al crear el registro'
  const action = initialData ? 'Actualizar registro' : 'Crear registro'

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start:
        initialData?.start.toLocaleDateString('en-CA') ||
        new Date().toLocaleDateString('en-CA'),
      end:
        initialData?.end.toLocaleDateString('en-CA') ||
        new Date().toLocaleDateString('en-CA'),
    },
  })

  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [itemsTable, setItemsTable] = useState<IEditableRowItem[]>(
    () =>
      initialData?.items.map((item) => ({
        lotLocation: {
          id: item.lotLocationId,
          productId: item.lotLocation.lot.product.id,
          productName: item.lotLocation.lot.product.name,
          lotId: item.lotLocation.lotId,
          laboratory: item.lotLocation.location.laboratory,
          maxQuantity: item.lotLocation.quantity,
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

  const [filteredProducts, setFilteredProducts] = useState<IFullLotLocation[]>(
    () => {
      const items = initialData?.items

      if (items && items.length > 0) {
        return locations.filter(
          (lotProduct) =>
            !items.find((item) => item.lotLocationId === lotProduct.id),
        )
      } else {
        return locations
      }
    },
  )

  const onSubmit = async (values: formType) => {
    setIsLoading(true)

    let result

    // if (initialData)
    //   result = await updateRecordWithItems(initialData.id, {
    //     start: new Date(values.start),
    //     end: new Date(values.end),
    //     items: itemsTable,
    //   })
    // else
    //   result = await createRecordWithItems({
    //     start: new Date(values.start),
    //     end: new Date(values.end),
    //     items: itemsTable,
    //   })

    // if (result != null) {
    //   toast({
    //     variant: 'success',
    //     title: toastTitle,
    //     description: toastDescription,
    //   })

    //   const record = await getRecordWithItems(result)
    //   setRecord(record || undefined)
    //   router.refresh()
    // } else {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Algo salió mal',
    //     description: errorMessage,
    //   })

    //   setRecord(undefined)
    // }

    setIsLoading(false)
    form.reset()
    onModalClose()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
        id='form'
      >
        <div className='grid sm:grid-cols-2 gap-4'>
          <div className='grid gap-3 max-sm:mb-8'>
            <FormField
              control={form.control}
              name='start'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de inicio</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className='cursor-pointer'
                      type='date'
                      {...field}
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
                    <Input
                      disabled={isLoading}
                      className='cursor-pointer'
                      type='date'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ItemSelector lotLocations={filteredProducts} onAdd={(id) => {}} />
          </div>

          {/* <ItemFormDataTable
            data={itemsTable}
            onDelete={(isSaved, id) => {
              if (isSaved) {
                const updatedItemsTable = itemsTable.map((itemTable) => {
                  if (itemTable.lotLocation.id === id)
                    return {
                      ...itemTable,
                      // quantity: {
                      //   value: initialData!.items.find(
                      //     (item) => item.lotLocationId === id,
                      //   )!.quantity!,
                      // },
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

                const updatedFilteredProducst = locations.filter(
                  (product) =>
                    !updatedItemsTable.find(
                      (item) => item.lotLocation.id === product.id,
                    ),
                )
                setFilteredProducts(updatedFilteredProducst)
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
          /> */}
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
