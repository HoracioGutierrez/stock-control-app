"use client"
import { historyColumns, productsColumns, providersColumns, customersColumns, cashRegistersColumns, ordersColumns, usersColumns } from "@/lib/columnDefinitions"
/* import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu" */
import { SortingState, getSortedRowModel, flexRender, getCoreRowModel, useReactTable, ColumnFiltersState, getFilteredRowModel, getPaginationRowModel, ColumnDef, VisibilityState } from "@tanstack/react-table"
import { IconCashRegister, IconClipboardList, IconDeviceDesktopX, IconTruck, IconTruckOff, IconUser, IconUserOff } from '@tabler/icons-react'
/* import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
 */
/* import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table" */
import { CustomerType, HistoryType, ProductType, ProviderType, UserType } from "@/schema"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
/* import { SortingState, getSortedRowModel, flexRender, getCoreRowModel, useReactTable, ColumnFiltersState, getFilteredRowModel, getPaginationRowModel, VisibilityState } from "@tanstack/react-table" */
/* import { IconCashRegister, IconDeviceDesktopX, IconTruck, IconTruckOff, IconUser, IconUserOff } from '@tabler/icons-react' */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
/* import { HistoryType, ProductType } from "@/schema" */
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { Filter, Package, PackageX } from "lucide-react"
import { getAllOrders } from "@/actions/getAllOrders"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Calendar } from "./ui/calendar"
import { toast } from "./ui/use-toast"
import { Button } from "./ui/button"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { columns, rewriteActionType } from "@/lib/columnHistoryDefinitions"
import { CustomDataTableProps } from "@/lib/types"

function CustomDataTable({ data, type, filterColumn, filterKey, actions, manualFetch, manualCallback, dateFilter, pageSize: size = 5, noFilter = false }: CustomDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [tableData, setTableData] = useState<ProductType | HistoryType[]>(data)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pageSize, setPageSize] = useState<number>(size)
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [activeState, setActiveState] = useState<boolean>(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    "active": false,
  })
  const form = useForm({
    defaultValues: {
      date: new Date().toDateString()
    }
  })
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
      },
      columnVisibility: {
        "active": false,
      },
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
          setColumnVisibility({ ...columnVisibility, "active": true })
        })
    } else {
      manualCallback()
        .then((data: any) => {
          setTableData(data.data)
          setColumnVisibility({ ...columnVisibility, "active": false })
        })
    }

  }, [activeState])

  const handlePageChange = (pageIndex: string) => {
    setPageSize(Number(pageIndex))
  }

  const handleDateSelect = (day: any, selectedDay: any) => {
    const sampleDate = new Date(day)
    const finalDate = sampleDate.getDate() - 1
    sampleDate.setDate(finalDate)

    const date = format(sampleDate, "yyyy-MM-dd")
    form.setValue("date", date)
    setSelectedDay(selectedDay)
    setOpen(false)
    getAllOrders(date)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        setTableData(data.data)
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
  }



  return (
    <div className="flex flex-col grow">
      {!noFilter && (
        <div className="flex justify-between items-center py-4">
          <Input
            placeholder={`Filtrar por ${filterColumn ?? "nombre"}`}
            value={(table.getColumn(filterKey || "name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              return table.getColumn(filterKey || "name")?.setFilterValue(event.target.value)
            }}
            className="max-w-sm"
          />

          {dateFilter && (
            <div>
              <Popover open={open}>
                <PopoverTrigger asChild>
                  <Button onClick={() => setOpen(true)}>{selectedDay ? format(selectedDay, "dd/MM/yyyy") : "Elige una fecha"}</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    onSelect={handleDateSelect}
                    selected={selectedDay}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

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
      )}
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
                  className={cn(
                    type === "orders" && row.original.status === "canceled" && "text-muted-foreground",
                  )}
                >
                  {row.getVisibleCells().map((cell) => {

                    if (cell.column.id === "openedById") {
                      return (
                        <TableCell key={cell.id}>
                          {row.original.openedById === null ? "No" : "Si"}
                        </TableCell>
                      )
                    }

                    if (cell.column.id === "createdAt" && type === "orders") {
                      return (
                        <TableCell key={cell.id} className="flex items-center gap-2">
                          {(row.original.status !== "canceled") && <IconClipboardList className="p-0 text-green-400 aspect-square" />}
                          {(row.original.status === "canceled") && <IconClipboardList className="p-0 text-red-400 aspect-square" />}
                          {row.original.createdAt ? row.original.createdAt.toLocaleString("es-ES") : "Sin fecha"}
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

                    if (cell.column.id === "status" && type === "orders") {
                      return (
                        <TableCell key={cell.id} className={cn(
                          row.original.status === "canceled" && "text-red-500"
                        )}>

                          {row.original.status === "canceled" && "Cancelado"}
                          {row.original.status === "pending" && "Pendiente"}
                        </TableCell>
                      )
                    }

                    if (cell.column.id === "actionType") {
                      return (<>
                        <TableCell key={cell.id} className="flex items-center gap-2">
                          {rewriteActionType[row.original.actionType]}
                        </TableCell>
                      </>
                      )
                    }

                    return (
                      <TableCell key={cell.id}>
                        <div className={cn(
                          "place-content-center gap-2 grid grid-cols-[max-content_1fr]",
                          cell.column.id === "currentAmount" && row.original.currentAmount < 0 && "text-red-500",
                          cell.column.id === "total" && row.original.total < 0 && "text-red-500",
                          cell.column.id === "status" && row.original.status === "canceled" && "text-red-500",
                          cell.column.id === "spentAmount" && row.original.spentAmount < 0 && "text-red-500"
                        )}>
                          {(
                            cell.column.id === "price" ||
                            cell.column.id === "currentAmount" ||
                            cell.column.id === "total" ||
                            cell.column.id === "spentAmount" ||
                            cell.column.id === "totalSpent"
                          ) && <span>$</span>}
                          {(cell.column.id === "label" && row.original.openedById != null) && <IconCashRegister className="p-0 text-green-400" />}
                          {(cell.column.id === "label" && row.original.openedById === null) && <IconDeviceDesktopX className="p-0 text-red-400 aspect-square" />}
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