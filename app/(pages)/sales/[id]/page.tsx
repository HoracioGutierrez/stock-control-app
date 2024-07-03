import { getById } from "@/actions/getById"
import { getOrderProductsById } from "@/actions/getOrderProductsById"
import CustomDataTable from "@/components/CustomDataTable"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { IconCash, IconCreditCard, IconCreditCardFilled, IconQuestionMark, IconTransferIn } from "@tabler/icons-react"
import { HandCoins, ShoppingBasket } from "lucide-react"

type OrderDetailPageProps = {
  params: {
    id: string
  }
}

async function OrderDetailPage({ params: { id } }: OrderDetailPageProps) {

  const { data, error } = await getOrderProductsById(id)

  return (
    <>
      <PageHeader title="Detalles de la Compra" goBack icon={<ShoppingBasket className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} />
      {data && (
        <section>
          <Card className="bg-transparent p-0 border-none">
            <CardContent className="gap-4 grid p-0">
              <div className="gap-2 gap-y-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <p className="text-muted-foreground">Cliente</p>
                  <p>
                    {data.customers ? data.customers.name : "Sin Nombre"}
                    {data.customers && data.customers.lastName && ", "}
                    {data.customers && data.customers.lastName && data.customers.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total</p>
                  <p>${data.total}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estado</p>
                  <p className={cn(data.status === "confirmed" && "text-green-400", data.status === "pending" && "text-yellow-400", data.status === "canceled" && "text-red-400")}>
                    Orden
                    {data.status === "confirmed" && " Confirmada"}
                    {data.status === "pending" && " Pendiente"}
                    {data.status === "canceled" && " Cancelada"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Método de pago</p>
                  <p className="flex items-center gap-2">
                    {data.paymentMethod === "cash" && (
                      <>
                        <IconCash />
                        <span className="ml-2">Efectivo</span>
                      </>
                    )}
                    {data.paymentMethod === "debit" && (
                      <>
                        <IconCreditCard />
                        <span className="ml-2">Debito</span>
                      </>
                    )}
                    {data.paymentMethod === "credit" && (
                      <>
                        <IconCreditCardFilled />
                        <span className="ml-2">Crédito</span>
                      </>
                    )}
                    {data.paymentMethod === "transfer" && (
                      <>
                        <IconTransferIn />
                        <span className="ml-2">Transferencia Bancaria</span>
                      </>
                    )}
                    {data.paymentMethod === "mercadopago" && (
                      <>
                        <IconCash />
                        <span className="ml-2">Mercado Pago / Billetera Virtual</span>
                      </>
                    )}
                    {data.paymentMethod === "other" && (
                      <>
                        <IconQuestionMark />
                        <span className="ml-2">Otro</span>
                      </>
                    )}
                    {data.paymentMethod === "debt" && (
                      <>
                        <HandCoins />
                        <span className="ml-2">Fiado/Deuda</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
      <section className="my-16">
        <CustomDataTable
          data={data ? data.products : []}
          type="order-details"
          noFilter
        />
      </section>
    </>
  )
}
export default OrderDetailPage