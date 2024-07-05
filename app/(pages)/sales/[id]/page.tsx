import { getById } from "@/actions/getById"
import { getOrderProductsById } from "@/actions/getOrderProductsById"
import CustomDataTable from "@/components/CustomDataTable"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { IconBulb, IconBulbFilled, IconBulbOff, IconCash, IconCreditCard, IconCreditCardFilled, IconQuestionMark, IconTransferIn } from "@tabler/icons-react"
import { HandCoins, ShoppingBasket, User2Icon } from "lucide-react"

type OrderDetailPageProps = {
  params: {
    id: string
  }
}

async function OrderDetailPage({ params: { id } }: OrderDetailPageProps) {

  const { data, error } = await getOrderProductsById(id)

  return (
    <>
      <PageHeader title="Detalles de la venta" goBack icon={<ShoppingBasket className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} />
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
                    <User2Icon className="w-5 h-5" />
                    nombre
                  </div>
                  <p>
                    {data.customers.name ? data.customers.name : "Sin Nombre"}
                    {data.customers.lastName && ", "}
                    {data.customers.lastName ? data.customers.lastName : "Sin Apellido"}
                  </p>
                </div>
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
                    <span>Venta </span>
                    {data.status === "confirmed" && "confirmada"}
                    {data.status === "pending" && "pendiente"}
                    {data.status === "canceled" && "cancelada"}
                  </p>
                </div>
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    {data.paymentMethod === "cash" && <IconCash />}
                    {data.paymentMethod === "debit" && <IconCreditCard />}
                    {data.paymentMethod === "credit" && <IconCreditCardFilled />}
                    {data.paymentMethod === "transfer" && <IconTransferIn />}
                    {data.paymentMethod === "mercadopago" && <IconCash />}
                    {data.paymentMethod === "other" && <IconQuestionMark />}
                    {data.paymentMethod === "debt" && <HandCoins />}
                    metodo de pago
                  </div>
                  <p>
                    {data.paymentMethod === "cash" && "Efectivo"}
                    {data.paymentMethod === "debit" && "Debito"}
                    {data.paymentMethod === "credit" && "Crédito"}
                    {data.paymentMethod === "transfer" && "Transferencia Bancaria"}
                    {data.paymentMethod === "mercadopago" && "Mercado Pago / Billetera Virtual"}
                    {data.paymentMethod === "other" && "Otro"}
                    {data.paymentMethod === "debt" && "Fiado/Deuda"}
                    {data.paymentMethod == undefined && "Sin Método de Pago"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
        <section className="flex flex-col pt-6">
          <p className="mb-8 text-muted-foreground text-sm">Productos comprados en la orden</p>
          <CustomDataTable
            data={data ? data.products : []}
            type="order-details"
            noFilter
          />
        </section>
      </div>
    </>
  )
}
export default OrderDetailPage