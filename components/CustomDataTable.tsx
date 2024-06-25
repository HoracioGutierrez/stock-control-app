"use client"
import { historyColumns, productsColumns, providersColumns, customersColumns, cashRegistersColumns } from "@/lib/columnDefinitions"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SortingState, getSortedRowModel, flexRender, getCoreRowModel, useReactTable, ColumnFiltersState, getFilteredRowModel, getPaginationRowModel, ColumnDef, VisibilityState } from "@tanstack/react-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CustomerType, HistoryType, ProductType, ProviderType } from "@/schema"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Eye, Filter, Package, Package2, PackageX } from "lucide-react"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { cn } from "@/lib/utils"
import { getAllCashRegisters } from "@/actions/getAllCashRegisters"
import { IconCashRegister, IconDeviceDesktopX, IconTruck, IconTruckOff, IconTruckReturn, IconUser, IconUserOff } from '@tabler/icons-react'

type CustomDataTableProps = {
  data: ProductType[] | HistoryType[] | CustomerType[] | ProviderType[] | null,
  type: "products" | "history" | "customers" | "providers" | "cash-registers"
  filterColumn?: string
  filterKey?: string
  actions?: (rowData: any) => JSX.Element
  manualFetch?: boolean
  manualCallback?: any
}

const columns: Record<"products" | "history" | "providers" | "customers" | "cash-registers", ColumnDef<unknown | any>[]> = {
  "products": productsColumns,
  "history": historyColumns,
  "providers": providersColumns,
  "customers": customersColumns,
  "cash-registers": cashRegistersColumns
}

function CustomDataTable({ data, type, filterColumn, filterKey, actions, manualFetch, manualCallback }: CustomDataTableProps) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [tableData, setTableData] = useState<ProductType | HistoryType[]>(data)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pageSize, setPageSize] = useState<number>(5)
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [activeState, setActiveState] = useState<boolean>(false)
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const table = useReactTable({
    columns: columns[type],
    data: tableData,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    columnResizeMode: "onChange",
    initialState: {
      pagination: {
        pageSize: 5
      }
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex,
        pageSize
      }
    }
  })


  useEffect(() => {
    setTableData(data)
  }, [data])

  useEffect(() => {

    if (!manualFetch) return
    if (activeState) {
      manualCallback(true)
        .then((data: any) => {
          setTableData(data.data)
        })
    } else {
      manualCallback()
        .then((data: any) => {
          setTableData(data.data)
        })
    }

  }, [activeState])

  const handlePageChange = (pageIndex: string) => {
    setPageSize(Number(pageIndex))
  }

  return (
    <div className="flex flex-col grow">
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder={`Filtrar por ${filterColumn ?? "nombre"}`}
          value={(table.getColumn(filterKey || "name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            return table.getColumn(filterKey || "name")?.setFilterValue(event.target.value)
          }}
          className="max-w-sm"
        />

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="ml-auto">
                      <Filter className="p-0 aspect-square" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cambiar la visibilidad de las columnas</p>
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end">
                {manualFetch && (<>
                  <DropdownMenuLabel>Ver inactivos</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    className={cn("capitalize", activeState ? "" : "text-muted-foreground")}
                    checked={activeState}
                    onCheckedChange={(value) => setActiveState(!!value)}
                  >
                    ver inactivos
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                </>
                )}
                <DropdownMenuLabel>Ver columnas</DropdownMenuLabel>
                {table
                  .getAllColumns()
                  .filter(
                    (column) => column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className={cn("capitalize", column.getIsVisible() ? "" : "text-muted-foreground")}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {/* {column.columnDef.meta ? column.columnDef.meta.name : column.id} */}
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>

          <Select onValueChange={handlePageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Cant. de resultados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-auto grow">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan} style={{ width: `${header.getSize()}px` }} onMouseDown={header.getResizeHandler()} className="hover:cursor-col-resize">
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {

                    if (cell.column.id === "openedById") {
                      return (
                        <TableCell key={cell.id}>
                          {row.original.openedById === null ? "No" : "Si"}
                        </TableCell>
                      )
                    }

                    if (cell.column.id === "createdAt") {
                      return (
                        <TableCell key={cell.id}>
                          {row.original.createdAt.toLocaleString("es-ES")}
                        </TableCell>
                      )
                    }

                    if (cell.column.id === "active") {
                      return (
                        <TableCell key={cell.id}>
                          {row.original.active ? "Si" : "No"}
                        </TableCell>
                      )
                    }

                    if (cell.column.id === "actions") {
                      return (
                        <TableCell key={cell.id} className="flex items-center gap-2">
                          {actions && actions(row.original)}
                        </TableCell>
                      )
                    }
                    return (
                      <TableCell key={cell.id} className="" onDoubleClick={() => { console.log(cell) }}>
                        <div className={cn(
                          "place-content-center gap-2 grid grid-cols-[max-content_1fr]",
                          cell.column.id === "currentAmount" && row.original.currentAmount < 0 && "text-red-500"
                        )}>
                          {(cell.column.id === "price" || cell.column.id === "currentAmount") && <span>$</span>}
                          {(cell.column.id === "label" && row.original.openedById != null) && <IconCashRegister className="p-0 text-green-400 " />}
                          {(cell.column.id === "label" && row.original.openedById === null) && <IconDeviceDesktopX className="p-0  text-red-400 aspect-square" />}
                          {(cell.column.id === "name" && type === "products" && row.original.active) && <Package className="p-0 text-green-400 aspect-square" />}
                          {(cell.column.id === "name" && type === "products" && !row.original.active) && <PackageX className="p-0 text-red-400 aspect-square" />}
                          {(cell.column.id === "name" && type === "customers" && row.original.active) && <IconUser className="p-0 text-green-400 aspect-square" />}
                          {(cell.column.id === "name" && type === "customers" && !row.original.active) && <IconUserOff className="p-0 text-red-400 aspect-square" />}
                          {(cell.column.id === "name" && type === "providers" && row.original.active) && <IconTruck className="p-0 text-green-400 aspect-square" />}
                          {(cell.column.id === "name" && type === "providers" && !row.original.active) && <IconTruckOff className="p-0 text-red-400 aspect-square" />}
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          {cell.column.id === "stock" && <span className="w-full grow"> unidades</span>}
                        </div>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns[type].length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div >
      <div className="flex justify-end items-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setPageIndex(pageIndex - 1)
            table.setPageIndex(pageIndex)
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setPageIndex(pageIndex + 1)
            table.setPageIndex(pageIndex)
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div >
  )
}
export default CustomDataTable