"use client"

import { getAllProducts } from "@/actions/getAllProducts"
import { providerOrdersColumns } from "@/lib/columnDefinitions"
import { Row, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useRef, useState } from "react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Check, Loader, Minus, Plus } from "lucide-react"
import { useVirtualizer } from '@tanstack/react-virtual'
import { createNewPurchaseOrder } from "@/actions/createNewPurchaseOrder"
import { useDialogStore } from "@/stores/generalDialog"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "../ui/use-toast"

type Props = {
  userId: string
}

function CreateProviderOrderForm({ userId }: Props) {

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [order, setOrder] = useState<any>({})
  const [units, setUnits] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [pinnedRow, setPinnedRow] = useState<any>({ top: [], bottom: [] })
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const [increment, setIncrement] = useState<boolean>(true)
  const { id, setClose } = useDialogStore((state: any) => state)


  const table = useReactTable({
    data: products,
    columns: providerOrdersColumns,
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
  }, [])

  const handleAddProduct = (product: any) => {
    const newOrder = { ...order }
    const isProdInOrder = newOrder[product.id]
    if (isProdInOrder) {
      newOrder[product.id].count += 1
    } else {
      newOrder[product.id] = {
        productId: product.id,
        count: 1
      }
    }
    setOrder(newOrder)
    setUnits((units: number) => units + 1)
    setTotal((total: number) => total + Number(product.price))
  }

  const handleRemoveProduct = (product: any) => {
    if (order[product.id] === undefined) return

    if (order[product.id].count < 1) {
      return
    } else {
      const newOrder = { ...order }
      const isProdInOrder = newOrder[product.id]
      if (isProdInOrder) {
        newOrder[product.id].count -= 1
      } else {
        newOrder[product.id] = {
          productId: product.id,
          count: 0
        }
      }
      setOrder(newOrder)
      setUnits((units: number) => units - 1)
      setTotal((total: number) => total - Number(product.price))
    }
  }

  const handleSubmit = () => {
    setLoading(true)
    const orderProducts: any[] = []
    Object.keys(order).forEach((key: string) => {
      orderProducts.push({
        productId: key,
        count: order[key].count
      })
    })
    createNewPurchaseOrder(userId, orderProducts, total, id, increment)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Orden guardada correctamente",
          description: "La orden se ha guardado correctamente, puedes verla en la sección de ordenes"
        })
        setClose()
        setIncrement(true)
        setOrder({})
        setUnits(0)
        setTotal(0)
        setPinnedRow({ top: [], bottom: [] })
      })
      .catch((error) => {
        if (error instanceof Error) {
          return toast({
            variant: "destructive",
            title: "Error al guardar la orden",
            description: error.message
          })
        }
        return toast({
          variant: "destructive",
          title: "Error al guardar la orden",
          description: "Error al guardar la orden, intente nuevamente o contacte al desarrollador."
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleIncrement = () => {
    setIncrement(!increment)
  }

  return (
    <div>
      <p className="text-muted-foreground">Seleccione de la lista de productos que deseas comprar de este proveedor</p>
      <div ref={tableContainerRef} style={{ overflow: "auto", position: "relative", height: "500px" }} className="relative my-10 w-full">
        <div className="overflow-auto">
          <Table style={{ display: "grid" }}>
            <TableHeader style={{ display: "grid", position: "sticky", top: "0px", zIndex: "1" }} className="bg-primary-foreground">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan} style={{ width: header.getSize(), display: "flex", alignItems: "center" }} onMouseDown={header.getResizeHandler()} className="hover:cursor-col-resize" >
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
                      display: "flex",
                      position: "absolute",
                      transform: `translateY(${virtualRow.start}px)`,
                      width: "100%",
                      justifyContent: "space-between"
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      if (cell.column.id === "actions") {
                        return (
                          <TableCell className="" key={cell.id} style={{ display: "flex", width: cell.column.getSize() }}>
                            <div className="flex items-center gap-4">
                              <Button variant={"outline"} className="p-0 aspect-square" onClick={() => {
                                handleRemoveProduct(row.original)
                              }}>
                                <Minus />
                              </Button>
                              <p className="font-bold text-lg">
                                {order[row.original.id] ? order[row.original.id].count : 0}
                              </p>
                              <Button variant={"outline"} className="p-0 aspect-square" onClick={() => {
                                handleAddProduct(row.original)
                                row.pin("top")
                              }}>
                                <Plus />
                              </Button>
                            </div>
                          </TableCell>
                        )
                      }

                      return (
                        <TableCell key={cell.id} style={{ display: "flex", width: cell.column.getSize() }}>
                          <div className="place-content-center gap-2 grid grid-cols-[max-content_1fr]">
                            {cell.column.id === "price" && <span>$</span>}
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            {cell.column.id === "stock" && <span className="w-full grow"> unidades</span>}
                          </div>
                        </TableCell>
                      )

                    })}
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter style={{ display: "grid", position: "sticky", bottom: "0px", zIndex: "1" }} className="bg-primary-foreground">
              <TableRow className="flex justify-between w-full">
                <TableCell colSpan={1} className="flex flex-col justify-center h-24">
                  <p className="text-muted-foreground">{Object.keys(order).length} productos en tu orden</p>
                  <p className="text-muted-foreground">{units} unidades</p>
                </TableCell>
                <TableCell colSpan={1} className="flex flex-col justify-end h-24">
                  <p className="font-bold text-xl">${total.toFixed(2)} total</p>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
      <div className="flex justify-center items-center gap-8">
        <Button className="flex items-center gap-2 text-white dark:text-primary-foreground group" onClick={handleSubmit}>
          {loading ? <Loader className="animate-spin" /> : <Check className="group-hover:text-green-500" />}
          <span className="text-muted-foreground">Guardar orden</span>
        </Button>
        <div className="flex items-center gap-2">
          <Checkbox className="flex justify-center items-center gap-2 w-7 h-7" onCheckedChange={handleIncrement} checked={increment} />
          <p className="text-sm">Incrementar stock <br /> en el inventario</p>
        </div>
      </div>
    </div>
  )
}
export default CreateProviderOrderForm