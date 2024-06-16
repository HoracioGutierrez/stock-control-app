import { Button } from "@/components/ui/button"
import { HistoryType, ProductType, CustomerType } from "@/schema"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export const productsColumns: ColumnDef<ProductType>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Nombre
          < ArrowUpDown className="ml-2 h-4 w-4" />
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="p-0"
        >
          Precio
          < ArrowUpDown className="ml-2 h-4 w-4" />
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="p-0"
        >
          Stock
          < ArrowUpDown className="ml-2 h-4 w-4" />
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

export const historyColumns: ColumnDef<HistoryType>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Fecha
          < ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: "createdAt",
  },
  {
    header: "Tipo de movimiento",
    accessorKey: "actionType",
  },
  {
    header: "Productos",
    accessorKey: "products",
  },
  {
    header: "Orden",
    accessorKey: "orderId",
  },
  {
    header: "Cliente",
    accessorKey: "customerId",
  },
  {
    header: "Acciones",
    accessorKey: "actions",
  }
]

export const customersColumns: ColumnDef<CustomerType>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Nombre
          < ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: "name",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="p-0"
        >
          Apellido
          < ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: "lastName",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="p-0"
        >
          Estado
          < ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: "active",
  },
  {
    header: "Teléfono",
    accessorKey: "phone",
  },
  {
    header: "Correo",
    accessorKey: "email",
  },
  {
    header: "Acciones",
    accessorKey: "actions",
  }
]