import { Pickaxe } from "lucide-react"
import PageHeader from "@/components/layout/PageHeader"
import { getAllOrders } from "@/actions/getAllOrders"
import OrdersTable from "@/components/orders/OrdersTable"
import { auth } from "@/auth"
import OrdersDialog from "@/components/order/OrdersDialog"

async function SalesPage() {

  const session = await auth()
  const { data, error } = await getAllOrders()

  return (
    <>
      <PageHeader title="Ventas" />
      {data.length == 0 && (
        <div className="place-items-center border-slate-400 grid border border-dashed rounded grow">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay ventas todavía</p>
            <p className="mb-6 text-muted-foreground text-sm">Podrás comenzar a ver ventas luego de realizar alguna acción en la aplicación.</p>
          </div>
        </div>
      )}
      {data.length > 0 && <OrdersTable data={data} />}
      <OrdersDialog userId={session?.user.id as string} />
    </>
  )
}
export default SalesPage