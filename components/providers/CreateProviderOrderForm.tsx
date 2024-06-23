"use client"

import { getAllProducts } from "@/actions/getAllProducts"
import { providerOrdersColumns } from "@/lib/columnDefinitions"
import { Row, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useRef, useState } from "react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Minus, Plus } from "lucide-react"
import { useVirtualizer } from '@tanstack/react-virtual'

type Props = {
  userId: string
}

function CreateProviderOrderForm({ userId }: Props) {

  const [products, setProducts] = useState<any[]>([])
  const [order, setOrder] = useState<any>({})
  const [units, setUnits] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [pinnedRow, setPinnedRow] = useState<any>({ top: [], bottom: [] })
  const tableContainerRef = useRef<HTMLDivElement>(null)

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
    estimateSize: () => 20, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
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
          //return setError(error.message)
        }
        //setError("Error al obtener los productos")
      })
  }, [])

  const handleAddProduct = (product: any) => {
    setOrder((order: any) => {
      const newOrder = { ...order }
      newOrder[product.id] = newOrder[product.id] ? newOrder[product.id] + 1 : 1
      return newOrder
    })
    setUnits((units: number) => units + 1)
    setTotal((total: number) => total + Number(product.price))
  }

  const handleRemoveProduct = (product: any) => {
    setOrder((order: any) => {
      const newOrder = { ...order }
      newOrder[product.id] = newOrder[product.id] ? newOrder[product.id] - 1 : 0
      return newOrder
    })
    setUnits((units: number) => units - 1)
    setTotal((total: number) => total - Number(product.price))
  }


  return (
    <div>
      <p className="text-muted-foreground">Seleccione de la lista de productos que deseas comprar de este proveedor</p>
      <div ref={tableContainerRef} style={{ overflow: "auto", position: "relative", height: "500px" }} className="relative my-10 w-full">
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
                              handleAddProduct(row.original)
                              row.pin("top")
                            }}>
                              <Plus />
                            </Button>
                            <p className="font-bold text-lg">
                              {order[row.original.id] || 0}
                            </p>
                            <Button variant={"outline"} className="p-0 aspect-square" onClick={() => {
                              handleRemoveProduct(row.original)
                            }}>
                              <Minus />
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
      <Button className="flex items-center gap-2 mx-auto text-white dark:text-primary-foreground">
        <span>Guardar orden</span>
      </Button>
    </div>
  )
}
export default CreateProviderOrderForm