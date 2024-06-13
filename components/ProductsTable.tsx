"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductType } from "@/schema"
import { SortingState, getSortedRowModel, ColumnDef, flexRender, getCoreRowModel, useReactTable, ColumnFiltersState, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import DeleteProductButton from "./DeleteProductButton"
import EditProductButton from "./EditProductButton"
import EditVariantButton from "./EditVariantButton"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ProductsTableProps = {
  data: any[]
}

const columns: ColumnDef<ProductType>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: "name",
  },
  {
    header: "Descripción",
    accessorKey: "description",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Precio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: "price",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: "stock",
  },
  {
    header: "Activo",
    accessorKey: "active",
  },
  {
    header: "Acciones",
    accessorKey: "actions",
  }
]

function ProductsTable({ data }: ProductsTableProps) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [products, setProducts] = useState<ProductType[]>(data)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pageSize, setPageSize] = useState<number>(5)
  const table = useReactTable({
    columns,
    data: products,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize: 5
      }
    },
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex: 0,
        pageSize
      }
    }
  })

  useEffect(() => {
    setProducts(data)
  }, [data])

  const handlePageChange = (pageIndex: string) => {
    setPageSize(Number(pageIndex))
  }

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filtrar por nombre"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            return table.getColumn("name")?.setFilterValue(event.target.value)
          }}
          className="max-w-sm"
        />
        <Select onValueChange={handlePageChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Cant. de Productos" />
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
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <span key={header.id}>{header.isPlaceholder
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
                  if (cell.column.id === "active") {
                    return (
                      <TableCell key={cell.id}>
                        {row.original.active ? "si" : "no"}
                      </TableCell>
                    )
                  }
                  if (cell.column.id === "actions") {
                    return (
                      <TableCell key={cell.id} className="flex items-center gap-2">
                        <DeleteProductButton active={row.original.active} barcode={row.original.barcode} />
                        <EditProductButton barcode={row.original.barcode} />
                        {!row.original.isVariant && <EditVariantButton barcode={row.original.barcode} />}
                      </TableCell>
                    )
                  }
                  return (
                    <TableCell key={cell.id} className="" onDoubleClick={() => { console.log(cell) }}>
                      <div className="grid grid-cols-[max-content_1fr] gap-2 place-content-center">
                        {cell.column.id === "price" && <span>$</span>}
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        {cell.column.id === "stock" && <span className="grow w-full"> unidades</span>}
                      </div>
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table >
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
export default ProductsTable