"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductType } from "@/schema"
import { SortingState, getSortedRowModel, ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { ArrowUpDown, Edit, ListTreeIcon, Loader, MoreHorizontal, Trash2, UndoDot } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { deleteProduct } from "@/actions/deleteProduct"
import { toast } from "./ui/use-toast"
import { reactivateProduct } from "@/actions/reactivateProduct"

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
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  const handleDelete = (barcode: string) => {
    setIsDeleting(true)
    setSelectedBarcode(barcode)
    deleteProduct(barcode)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Producto eliminado correctamente",
          description: "El producto se ha eliminado correctamente de la base de datos",
        })
      })
      .catch((error) => {
        if (error instanceof Error) {
          if (error.message === "Producto no encontrado") {
            toast({
              variant: "destructive",
              title: "Producto no encontrado",
              description: "El producto no existe en nuestro inventario",
            })
          }
          return toast({
            variant: "destructive",
            title: "Error al eliminar el producto",
            description: error.message
          })
        }
        return toast({
          variant: "destructive",
          title: "Error al eliminar el producto",
          description: "Error al eliminar el producto",
        })
      })
      .finally(() => {
        setIsDeleting(false)
        setSelectedBarcode("")
      })
  }

  const handleReactivate = (barcode: string) => {
    setIsDeleting(true)
    setSelectedBarcode(barcode)
    reactivateProduct(barcode)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Producto reactivado correctamente",
          description: "El producto se ha reactivado correctamente de la base de datos",
        })
      })
      .catch((error) => {
        if (error instanceof Error) {
          if (error.message === "Producto no encontrado") {
            toast({
              variant: "destructive",
              title: "Producto no encontrado",
              description: "El producto no existe en nuestro inventario",
            })
          }
          return toast({
            variant: "destructive",
            title: "Error al reactivar el producto",
            description: error.message
          })
        }
        return toast({
          variant: "destructive",
          title: "Error al reactivar el producto",
          description: "Error al reactivar el producto",
        })
      })
      .finally(() => {
        setIsDeleting(false)
        setSelectedBarcode("")
      })
  }


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
                      <Button variant={"outline"} className="aspect-square p-0" onClick={() => {
                        if (row.original.active) {
                          handleDelete(row.original.barcode)
                        } else {
                          handleReactivate(row.original.barcode)
                        }
                      }}>
                        {isDeleting && selectedBarcode === row.original.barcode ? <Loader className="animate-spin" /> : row.original.active ? <Trash2 className="aspect-square p-0" /> : <UndoDot className="aspect-square p-0" />}
                      </Button>
                      <Button variant={"outline"} className="aspect-square p-0" onClick={() => { console.log(row.original) }} disabled>
                        <Edit className="aspect-square p-0" />
                      </Button>
                      <Button variant={"outline"} className="aspect-square p-0" onClick={() => { console.log(row.original) }} disabled>
                        <ListTreeIcon className="aspect-square p-0" />
                      </Button>
                    </TableCell>
                  )
                }
                return (
                  <TableCell key={cell.id} className="">
                    {cell.column.id === "price" && "$"}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {cell.column.id === "stock" && " unidades"}
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