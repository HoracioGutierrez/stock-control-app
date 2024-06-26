import { Button } from "@/components/ui/button"
import { HistoryType, ProductType, CustomerType, ProviderType, CashRegisterType } from "@/schema"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

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
          < ArrowUpDown className="ml-2 w-4 h-4" />
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
          < ArrowUpDown className="ml-2 w-4 h-4" />
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
          < ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      )
    },
    accessorKey: "stock",
  },
  {
    header: "Activo",
    accessorKey: "active",
    size: 1
  },
  {
    header: "Acciones",
    accessorKey: "actions",
    size: 1
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
          < ArrowUpDown className="ml-2 w-4 h-4" />
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
          < ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      )
    },
    accessorKey: "name",
    meta: {
      name: "Nombre"
    }
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
          < ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      )
    },
    accessorKey: "lastName",
    meta: {
      name: "Apellido"
    }
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
    header: "Balance Total",
    accessorKey: "currentAmount",
  },
  {
    header: "Activo",
    accessorKey: "active",
    size: 1,
  },
  {
    header: "Acciones",
    accessorKey: "actions",
    size: 1
  }
]

export const providersColumns: ColumnDef<ProviderType>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Nombre
          < ArrowUpDown className="ml-2 w-4 h-4" />
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
          < ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      )
    },
    accessorKey: "lastName",
  },
  {
    header: "Teléfono",
    accessorKey: "phone",
  },
  {
    header: "Activo",
    accessorKey: "active",
    size: 1
  },
  {
    header: "Acciones",
    accessorKey: "actions",
    size: 1
  }
]

export const cashRegistersColumns: ColumnDef<CashRegisterType>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Nombre de caja
          < ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      )
    },
    accessorKey: "label",
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
          Monto actual
          < ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      )
    },
    accessorKey: "currentAmount",
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
          Abierta
          < ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      )
    },
    accessorKey: "openedById",
  },
  {
    header: "Activo",
    accessorKey: "active",
    size: 1
  },
  {
    header: "Acciones",
    accessorKey: "actions",
    size: 1
  }
]

export const providerOrdersColumns: ColumnDef<any>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Nombre
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      )
    },
    accessorKey: "name",
    /* cell: */
  },
  {
    header: ({ column }) => {
      //price
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="p-0"
        >
          Precio
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      )
    },
    accessorKey: "price",
  },
  {
    header: "Acciones",
    accessorKey: "actions",
  }
]

export const ordersColumns: ColumnDef<any>[] = [
  //createdAt
  {
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Fecha
          < ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      )
    },
    accessorKey: "stock-control-app_order.createdAt",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Total
          < ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      )
    },
    accessorKey: "stock-control-app_order.total",
  },
  {
    header: "Pago con",
    accessorKey: "stock-control-app_order.paymentMethod",
  },
  {
    header: "Registro de Caja",
    accessorKey: "stock-control-app_cashRegister.label",
  }, {
    header: "Cliente",
    accessorKey: "name",
    cell: ({ row }) => {
      return row.original["stock-control-app_customer"].name + ", " + row.original["stock-control-app_customer"].lastName
    },
    filterFn: (row, id, value) => {
      const name = row.original["stock-control-app_customer"].name + ", " + row.original["stock-control-app_customer"].lastName.toLowerCase()
      return name.toLowerCase().includes(value.toLowerCase())
    }
  }
]

export const priceColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Nombre
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      )
    },
    accessorKey: "name",
    id: "name",
    /* cell: */
  },
  {
    header: ({ column }) => {
      //price
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="p-0"
        >
          Precio
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      )
    },
    accessorKey: "price",
  },
]