"use client"
import { useEffect, useRef, useState } from "react"
import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { Row, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { providerOrdersColumns, priceColumns } from "@/lib/columnDefinitions"
import { useVirtualizer } from '@tanstack/react-virtual'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { Check, Loader, Minus, Plus } from "lucide-react"
import { getAllProducts } from "@/actions/getAllProducts"
import { cn } from "@/lib/utils"
import { updatePrices } from "@/actions/updatePrices"
import { toast } from "../ui/use-toast"

const schema = yup.object().shape({
  amount: yup.number().moreThan(0, "El monto debe ser mayor a cero").required("El monto es obligatorio"),
  unitType: yup.string().required("El tipo de unidad es obligatorio"),
  operationType: yup.string().required("El tipo de operacion es obligatorio"),
  applyToAll: yup.boolean().required("Debes seleccionar si quieres aplicar el precio a todos los productos o bien seleccionar los productos manualmente"),
})

function EditPricesForm({ barcode, userId, setIsFullWidth }: any) {

  const [products, setProducts] = useState<any[]>([])
  const [pinnedRow, setPinnedRow] = useState<any>({ top: [], bottom: [] })
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const { id, setClose } = useDialogStore((state: any) => state)
  const [loading, setLoading] = useState<boolean>(false)
  const [operationType, setOperationType] = useState<string>("add")
  const [applyToAll, setApplyToAll] = useState<boolean>(true)
  const [unitType, setUnitType] = useState<string>("gross")
  const { register, handleSubmit, formState: { errors }, reset } = useForm<any>({
    defaultValues: {
      amount: 0,
      operationType: "add",
      applyToAll: true,
      unitType: "gross"
    },
    resolver: yupResolver(schema)
  })

  const table = useReactTable({
    data: products,
    columns: priceColumns,
    getCoreRowModel: getCoreRowModel(),
    enableRowPinning: true,
    onRowPinningChange: setPinnedRow,
    state: {
      rowPinning: {
        top: pinnedRow.top,
      }
    }
  })

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 20,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' &&
        navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  })

  useEffect(() => {
    if (!applyToAll) {
      setIsFullWidth(true)
      getAllProducts()
        .then((data) => {
          if (data?.error) {
            throw new Error(data.error)
          }
          setProducts(data.data)
        })
        .catch((error) => {
          if (error instanceof Error) {
            toast({
              variant: "destructive",
              title: "Error al obtener los productos",
              description: error.message
            })
          }
          toast({
            variant: "destructive",
            title: "Error al obtener los productos",
            description: "Error al obtener los productos, intente nuevamente o contacte al desarrollador."
          })
        })
    } else {
      setIsFullWidth(false)
    }
  }, [applyToAll])

  const onSubmit = (data: any) => {
    setLoading(true)
    const selectedColumns = table.getSelectedRowModel().flatRows.map((row: any) => row.original.id)
    updatePrices(applyToAll, selectedColumns, operationType, unitType, data.amount, userId)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Precios actualizados correctamente",
          description: "El precio de los productos se ha actualizado correctamente",
        })
        setClose()
      })
      .catch((error) => {
        if (error instanceof Error) {
          return toast({
            variant: "destructive",
            title: "Error al actualizar los precios",
            description: error.message
          })
        }
        return toast({
          variant: "destructive",
          title: "Error al actualizar los precios",
          description: "Error al actualizar los precios, intente nuevamente o contacte al desarrollador."
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleChange = (value: string) => {
    setOperationType(value)
  }

  const handleCkeckboxChange = (value: boolean) => {
    setApplyToAll(!applyToAll)
  }

  const handleUnitTypeChange = (value: string) => {
    setUnitType(value)
  }

  return (
    <>
      <p className="mb-8 text-muted-foreground text-sm">Podes editar los precios de los productos de manera general, para todos los productos o bien seleccionando los productos manualmente desde la lista que esta abajo.</p>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} id="edit-prices-form">
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 w-full">
              <Label htmlFor="amount">Monto</Label>
              {errors.amount && <p className="text-red-500">{errors.amount.message as string}</p>}
              <Input type="number" placeholder="Monto" {...register("amount")} />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Label htmlFor="unitType">Tipo de unidad</Label>
              {errors.unitType && <p className="text-red-500">{errors.unitType.message as string}</p>}
              <Select onValueChange={handleUnitTypeChange} value={unitType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un tipo de unidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gross">$</SelectItem>
                  <SelectItem value="percentage">%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-4 w-full">
                <Label htmlFor="operationType">Tipo de operacion</Label>
                {errors.operationType && <p className="text-red-500">{errors.operationType.message as string}</p>}
                <Select onValueChange={handleChange} value={operationType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un tipo de operacion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add">Aumentar precio</SelectItem>
                    <SelectItem value="remove">Reducir precio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 py-4">
            <div className="flex justify-center gap-4 w-full">
              {errors.applyToAll && <p className="text-red-500">{errors.applyToAll.message as string}</p>}
              <Checkbox {...register("applyToAll")} onCheckedChange={handleCkeckboxChange} checked={applyToAll} />
              <Label htmlFor="applyToAll">Aplicar a todos los productos</Label>
            </div>
          </div>
        </form>
      </div>
      {!applyToAll && (
        <div ref={tableContainerRef} style={{ overflow: "auto", position: "relative", height: "500px" }} className="relative my-10 w-full">
          <Table style={{ display: "grid" }}>
            <TableHeader style={{ display: "grid", position: "sticky", top: "0px", zIndex: "1" }} className="bg-primary-foreground">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} style={{ display: 'flex', width: '100%' }}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan} style={{ display: "flex", alignItems: "center" }} onMouseDown={header.getResizeHandler()} className={cn("hover:cursor-col-resize", header.column.columnDef.id === "name" && "grow")} >
                      <span key={header.id} className="hover:cursor-pointer">{header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}</span>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody style={{
              display: "grid",
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}>
              {rowVirtualizer.getVirtualItems().map(virtualRow => {
                const row = rows[virtualRow.index] as Row<any>
                return (
                  <TableRow
                    key={row.id}
                    data-index={virtualRow.index}
                    ref={node => rowVirtualizer.measureElement(node)}
                    style={{
                      display: "grid",
                      position: "absolute",
                      transform: `translateY(${virtualRow.start}px)`,
                      width: "100%",
                      justifyContent: "space-between"
                    }}
                    className="grid-cols-[min-content_1fr_min-content]"
                  >
                    {row.getVisibleCells().map((cell: any) => {
                      return (
                        <TableCell key={cell.id} style={{ display: "flex" }}>
                          <div className="place-content-center gap-2 grid grid-cols-[max-content_1fr]">
                            {cell.column.id === "price" && <span>$</span>}
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
      <Button form="edit-prices-form" className="flex items-center gap-2 mx-auto mt-8 group">
        {loading ? <Loader className="animate-spin" /> : <Check className="group-hover:text-green-500 text-muted-foreground aspect-square" />}
        <span className="text-muted-foreground">Guardar</span>
      </Button>
    </>
  )
}

export default EditPricesForm