"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductType } from "@/schema"
import { SortingState, getSortedRowModel, ColumnDef, flexRender, getCoreRowModel, useReactTable, RowSelectionState } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import DeleteProductButton from "./DeleteProductButton"
import EditProductButton from "./EditProductButton"
import EditVariantButton from "./EditVariantButton"

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
  const [selectedBarcode, setSelectedBarcode] = useState<string>("")
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [products, setProducts] = useState<ProductType[]>(data)
  const table = useReactTable({
    columns,
    data: products,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        const productsCopy = [...data]
        productsCopy[rowIndex][columnId] = value
        setProducts(productsCopy)
      },
    },
  })

  return (
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
                      <EditVariantButton />
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
  )
}
export default ProductsTable