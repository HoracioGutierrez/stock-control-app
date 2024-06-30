"use client"
import { getProviderDetails } from "@/actions/getProviderDetails"
import { getAllProducts } from "@/actions/getAllProducts"
import { providerOrdersColumns, purchaseOrdersColumns, variantColumns } from "@/lib/columnDefinitions"
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
import { getAllPossibleVariantProducts } from "@/actions/getAllPossibleVariantProducts"
import { RadioGroup } from "../ui/radio-group"
import CustomButton from "../layout/CustomButton"


type Props = {
  userId?: string
  providerId?: string
  setProductId?: any
}
function LinkProductToVariantTable({ userId, providerId, setProductId }: Props) {

  const [variants, setVariants] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [order, setOrder] = useState<any>({})
  const [units, setUnits] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [pinnedRow, setPinnedRow] = useState<any>({ top: [], bottom: [] })
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const [increment, setIncrement] = useState<boolean>(true)
  const { id, setClose } = useDialogStore((state: any) => state)

  const table = useReactTable({
    data: variants,
    columns: variantColumns,
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
    getAllPossibleVariantProducts(id)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        setVariants(data.data)
      })
      .catch((error) => {
        if (error instanceof Error) {
          return toast({
            variant: "destructive",
            title: "Error al obtener los productos",
            description: error.message
          })
        }
        return toast({
          variant: "destructive",
          title: "Error al obtener los productos",
          description: error.message
        })
      })
  }, [])

  useEffect(() => {
    if (table.getSelectedRowModel().rows.length > 0) {
      setProductId(table.getSelectedRowModel().rows[0].original.id)
    }
  }, [table.getSelectedRowModel().rows])


  return (
    <div>
      <p className="text-muted-foreground">Esta es una lista de ordenes de compras hechas para este proveedor</p>
      {/* <RadioGroup> */}
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
                    justifyContent: "space-between",
                  }}
                  className="truncate"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id} style={{ display: "flex", width: cell.column.getSize() }} className="truncate">
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
            <TableRow className="flex justify-center w-full">
              
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      {/* </RadioGroup> */}
    </div>
  )
}

export default LinkProductToVariantTable