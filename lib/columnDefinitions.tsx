import { Button } from "@/components/ui/button"
import { HistoryType, ProductType, CustomerType, ProviderType, CashRegisterType } from "@/schema"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, TrendingDown, TrendingUp } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { IconTruckLoading } from "@tabler/icons-react"
import { RadioGroupItem } from "@/components/ui/radio-group"

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
    header: "Balance Actual",
    accessorKey: "currentAmount",
  },
  {
    header: "Total Gastado",
    accessorKey: "spentAmount",
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
    header: "Total gastado",
    accessorKey: "totalSpent",
    cell: ({ row }) => {
      return row.original.totalSpent ? Number(row.original.totalSpent).toFixed(2) : 0
    },
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

export const purchaseOrdersColumns: ColumnDef<any>[] = [
  {
    header: "Fecha",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return row.original.createdAt.toLocaleString("es-ES")
    },
  },
  {
    header: "Total",
    accessorKey: "total",
  },
  {
    header: "Cant. de productos",
    accessorKey: "itemCount",
    cell: ({ row }) => {
      return `${row.original.itemCount} ${row.original.itemCount > 1 ? "unidades" : "unidad"}`
    },
  },
  {
    header: "Acciones",
    accessorKey: "actions",
    size: 1
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
    accessorKey: "createdAt",
    id: "createdAt",
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
    accessorKey: "total",
    id: "total",
  },
  {
    header: "Pago con",
    accessorKey: "paymentMethod",
    cell: ({ row }) => {
      if (row.original.paymentMethod === "cash") {
        return "Efectivo"
      }

      if (row.original.paymentMethod === "debt") {
        return "Fiado/Deuda"
      }

      if (row.original.paymentMethod === "credit") {
        return "Crédito"
      }

      if (row.original.paymentMethod === "debit") {
        return "Débito"
      }

      if (row.original.paymentMethod === "transfer") {
        return "Transferencia"
      }

      if (row.original.paymentMethod === "mercadopago") {
        return "Mercado Pago"
      }

      if (row.original.paymentMethod === "other") {
        return "Otro"
      }

      return "Sin pago"
    },
  },
  {
    header: "Registro de Caja",
    accessorKey: "label",
  },
  {
    header: "Cliente",
    accessorKey: "name",
    cell: ({ row }) => {
      if (row.original.customerName && row.original.customerLastName) {
        return row.original.customerName + ", " + row.original.customerLastName
      }

      if (row.original.customerName && !row.original.customerLastName) {
        return row.original.customerName
      }

      if (!row.original.customerName && row.original.customerLastName) {
        return row.original.customerLastName
      }

      return "Sin cliente"
    },
    filterFn: (row, id, value) => {
      const name = row.original.name + ", " + row.original.lastName.toLowerCase()
      return name.toLowerCase().includes(value.toLowerCase())
    }
  },
  {
    header: "Estado",
    accessorKey: ".status",
    id: "status",
  },
  {
    header: "Acciones",
    accessorKey: "actions",
    size: 1
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

export const usersColumns: ColumnDef<any>[] = [
  {
    header: "Nombre",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Nombre de usuario",
    accessorKey: "username",
  },
  {
    header: "Es admin",
    accessorKey: "isAdmin",
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

export const balanceColumns: ColumnDef<any>[] = [
  {
    header: "Fecha",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return row.original.createdAt.toLocaleString("es-ES")
    },
  },
  {
    header: "Tipo de operación",
    accessorKey: "operationType",
    cell: ({ row }) => {

      if (row.original.operationType === "pay-customer-debt-all") {
        return "Saldo deuda total"
      }

      if (row.original.operationType === "pay-customer-debt-manual") {
        return "Saldo deuda manual"
      }

      if (row.original.operationType === "save-order-debt") {
        return "Nueva compra deuda/fiado"
      }

      if (row.original.operationType === "save-order-cash") {
        return "Nueva compra efectivo"
      }

      if (row.original.operationType === "save-order-credit") {
        return "Nueva compra crédito"
      }

      if (row.original.operationType === "save-order-debit") {
        return "Nueva compra débito"
      }

      if (row.original.operationType === "save-order-transfer") {
        return "Nueva compra transferencia"
      }

      if (row.original.operationType === "save-order-mercadopago") {
        return "Nueva compra mercadopago"
      }

      if (row.original.operationType === "save-order-other") {
        return "Nueva compra otro"
      }

      if (row.original.operationType === "save-purchase-order") {
        return "Nueva orden de compra a proveedor"
      }

      if (row.original.operationType === "save-manual-income") {
        return "Ingreso manual"
      }

      if (row.original.operationType === "save-manual-expense") {
        return "Egreso manual"
      }

      if (row.original.operationType === "refund-customer") {
        return "Reembolso cliente / Compra Cancelada"
      }

      if (row.original.operationType === "open-cash-register") {
        return "Apertura caja"
      }

      if (row.original.operationType === "close-cash-register") {
        return "Cierre caja"
      }

      return row.original.operationType

    }
  },
  {
    header: "Descripcion",
    accessorKey: "detail",
  },
  {
    header: "Monto de la operación",
    accessorKey: "incomingAmount",
    cell: ({ row }) => {

      const debtTypes = ["save-order-debt", "refund-customer", "save-manual-expense", "save-purchase-order"]
      if (debtTypes.includes(row.original.operationType)) {
        return (
          <>
            <TrendingDown className="p-0 text-red-400 aspect-square" />
            <span className="ml-2">$ {row.original.incomingAmount}</span>
          </>
        )
      } else {
        return (
          <>
            <TrendingUp className="p-0 text-green-400 aspect-square" />
            <span className="ml-2">$ {row.original.incomingAmount}</span>
          </>
        )
      }
    },
  },
  {
    header: "Balance Efectivo",
    accessorKey: "balance",
    cell: ({ row }) => {
      return "$" + row.original.balance
    },
  },
  {
    header: "Balance Total",
    accessorKey: "balanceWithDebt",
    cell: ({ row }) => {
      return "$" + row.original.balanceWithDebt
    },
  }
]

export const customerOrdersColumns: ColumnDef<any>[] = [
  {
    header: "Fecha",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return row.original.createdAt.toLocaleString("es-ES")
    },
  },
  {
    header: "Total",
    accessorKey: "total",
    cell: ({ row }) => {
      return "$" + row.original.total
    },
  },
  {
    header: "Pago con",
    accessorKey: "paymentMethod",
    cell: ({ row }) => {
      if (row.original.paymentMethod === "cash") {
        return "Efectivo"
      }

      if (row.original.paymentMethod === "debt") {
        return "Fiado/Deuda"
      }

      if (row.original.paymentMethod === "credit") {
        return "Crédito"
      }

      if (row.original.paymentMethod === "debit") {
        return "Débito"
      }

      if (row.original.paymentMethod === "transfer") {
        return "Transferencia"
      }

      if (row.original.paymentMethod === "mercadopago") {
        return "Mercado Pago"
      }

      if (row.original.paymentMethod === "other") {
        return "Otro"
      }

      return "Sin pago"
    }
  },
  {
    header: "Cant. de productos",
    accessorKey: "itemCount",
  },
  {
    header: "Acciones",
    accessorKey: "actions",
    size: 1
  },
]

export const orderDetailsColumns: ColumnDef<any>[] = [
  {
    header: "Nombre",
    accessorKey: "name",
  },
  {
    header: "Precio",
    accessorKey: "price",
  },
  {
    header: "Cantidad",
    accessorKey: "quantity",
  },
  {
    header: "Total",
    accessorKey: "total",
  }
]

export const purchaseOrderProductsColumns: ColumnDef<any>[] = [
  {
    header: "Nombre",
    accessorKey: "name",
  },
  {
    header: "Precio",
    accessorKey: "price",
  },
  {
    header: "Cantidad",
    accessorKey: "quantity",
  },
  {
    header: "Total",
    accessorKey: "total",
  }
]

export const purchaseOrdersProviderColumns: ColumnDef<any>[] = [
  {
    header: "Fecha",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <IconTruckLoading />
          {row.original.createdAt.toLocaleString("es-ES")}
        </div>
      )
    },
  },
  {
    header: "Proveedor",
    accessorKey: "providerName",
    cell: ({ row }) => {
      return row.original.providerName + ", " + row.original.providerLastName
    },
  },
  {
    header: "Compañía",
    accessorKey: "providersCompanyName",
    cell: ({ row }) => {
      return row.original.providersCompanyName ? row.original.providersCompanyName : "Sin compañía"
    },
  },
  {
    header: "Total",
    accessorKey: "total",
  },
  {
    header: "Cant. de productos",
    accessorKey: "itemCount",
  },
  {
    header: "Acciones",
    accessorKey: "actions",
    size: 1
  }
]

export const variantColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: "Seleccionar",
    cell: ({ row, table }) => (
      <input type="radio" name="variant" value={row.original.id} onChange={(e: any) => {
        table.toggleAllPageRowsSelected(false)
        row.toggleSelected(e.target.value)
      }} />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 1,
  },
  {
    header: "Nombre",
    accessorKey: "name",
    meta: {
      name: "Nombre"
    },
  },
  {
    header: "Descripción",
    accessorKey: "description",
    meta: {
      name: "Descripción"
    },
    cell : ({ row }) => {
      return (
        <div className="max-w-sm">
          {row.original.description}
        </div>
      )
    },
    size : 300
  },
  {
    header: "Precio",
    accessorKey: "price",
    meta: {
      name: "Precio"
    }
  },
]