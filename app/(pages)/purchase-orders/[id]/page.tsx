import { getPurchaseOrderDetails } from "@/actions/getPurchaseOrderDetails"
import PageHeader from "@/components/layout/PageHeader"
import PurchaseOrderProductsTable from "@/components/purchaseOrders/PurchaseOrderProductsTable"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { IconBulb, IconBulbFilled, IconBulbOff, IconCash } from "@tabler/icons-react"
import { Computer, User2Icon } from "lucide-react"

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
      <div className="gap-4 xl:gap-10 grid grid-cols-1 xl:grid-cols-[max-content_1fr] grid-rows-[auto_1fr] xl:grid-rows-1 grow">
        {data && (
          <section>
            <Card className="shadow-none border-none h-full">
              <CardHeader>
                <CardDescription className="text-muted-foreground">Informacion Generales</CardDescription>
              </CardHeader>
              <CardContent className="gap-6 grid grid-cols-2 xl:grid-cols-1">
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    <IconCash className="w-5 h-5" />
                    total
                  </div>
                  <p>${Number(data.total).toFixed(2)}</p>
                </div>
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    {data.status === "confirmed" && <IconBulbFilled className="w-5 h-5" />}
                    {data.status === "pending" && <IconBulb className="w-5 h-5" />}
                    {data.status === "canceled" && <IconBulbOff className="w-5 h-5" />}
                    estado
                  </div>
                  <p className={cn(data.status === "confirmed" && "text-green-400", data.status === "pending" && "text-yellow-400", data.status === "canceled" && "text-red-400")}>
                    <span>Orden de compra </span>
                    {data.status === "confirmed" && "confirmada"}
                    {data.status === "pending" && "pendiente"}
                    {data.status === "canceled" && "cancelada"}
                  </p>
                </div>
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    <User2Icon className="w-5 h-5" />
                    proveedor
                  </div>
                  <p>
                    {data.providerName ? data.providerName : "Sin Nombre"}
                    {data.providerLastName && ", "}
                    {data.providerLastName ? data.providerLastName : "Sin Apellido"}
                  </p>
                </div>
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    <Computer className="w-5 h-5" />
                    caja
                  </div>
                  <p>{data.cashRegister ? data.cashRegister : "Sin caja/Supervisor"}</p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
        <section className="flex flex-col pt-6">
          <p className="mb-8 text-muted-foreground text-sm">Productos comprados en la orden</p>
          <PurchaseOrderProductsTable data={data.products || []} />
        </section>
      </div>
    </>
  )
}
export default PurchaseOrderDetailsPage