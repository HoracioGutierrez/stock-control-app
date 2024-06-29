import { getPurchaseOrderDetails } from "@/actions/getPurchaseOrderDetails"
import PageHeader from "@/components/layout/PageHeader"
import PurchaseOrderProductsTable from "@/components/purchaseOrders/PurchaseOrderProductsTable"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type PurchaseOrderDetailsPageProps = {
  params: {
    id: string
  }
}

async function PurchaseOrderDetailsPage({ params: { id } }: PurchaseOrderDetailsPageProps) {

  const { data, error } = await getPurchaseOrderDetails(id)

  return (
    <>
      <PageHeader title="Detalles de la orden de compra" goBack />
      {data && (
        <section>
          <Card className="bg-transparent p-0 border-none">
            <CardContent className="gap-4 grid p-0">
              <div className="gap-2 gap-y-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <p className="text-muted-foreground">Total</p>
                  <p>${data.total}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estado</p>
                  <p className={cn(data.status === "confirmed" && "text-green-400", data.status === "pending" && "text-yellow-400", data.status === "canceled" && "text-red-400")}>
                    <span>Orden de compra </span>
                    {data.status === "confirmed" && "confirmada"}
                    {data.status === "pending" && "pendiente"}
                    {data.status === "canceled" && "cancelada"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Proveedor</p>
                  <p>{data.providerName}, {data.providerLastName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Caja</p>
                  <p>{data.cashRegister ? data.cashRegister : "Sin caja/Supervisor"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
      <section className="my-16">
        <p className="text-muted-foreground">Productos comprados en la orden</p>
        <PurchaseOrderProductsTable data={data.products || []}/>
      </section>
    </>
  )
}
export default PurchaseOrderDetailsPage