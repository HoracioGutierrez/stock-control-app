import { getById } from "@/actions/getById"
import { getOrdersByCustomerId } from "@/actions/getOrdersByCustomerId"
import CustomDataTable from "@/components/CustomDataTable"
import CustomerDetailsTable from "@/components/customer/CustomerDetailsTable"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { IconCash, IconId, IconMail } from "@tabler/icons-react"
import { Home, Phone, User2Icon, UserRound } from "lucide-react"

type Props = {
  params: {
    id: string
  }
}

async function CustomerDetailsPage({ params: { id } }: Props) {

  const { data, error } = await getById("customer", id)
  const { data: orders, error: ordersError } = await getOrdersByCustomerId(id)

  return (
    <>
      <PageHeader title="Detalles del Cliente" goBack icon={<UserRound className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} />
      {(!data || data.length == 0) && (
        <div className="place-items-center border-slate-400 grid border border-dashed rounded grow">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay clientes creados todavía</p>
            <p className="mb-6 text-muted-foreground text-sm">Podrás comenzar a operar tan pronto como agregues al menos un cliente a tu lista o crees uno nuevo.</p>
          </div>
        </div>
      )}
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
                    {data.name ? data.name : "Sin Nombre"}
                    {data.lastName && ", "}
                    {data.lastName ? data.lastName : "Sin Apellido"}
                  </p>
                </div>
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    <Phone className="w-5 h-5" />
                    teléfono
                  </div>
                  <p>{data.phone ? data.phone : "Sin Teléfono"}</p>
                </div>
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    <IconMail className="w-5 h-5" />
                    email
                  </div>
                  <p className="truncate">{data.email ? data.email : "Sin Email"}</p>
                </div>
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    <Home className="w-5 h-5" />
                    dirección
                  </div>
                  <p>{data.address ? data.address : "Sin Dirección"}</p>
                </div>
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    <IconId className="w-5 h-5" />
                    cuit/cuil
                  </div>
                  <p>{data.cuitCuil ? data.cuitCuil : "Sin Cuit/CUIL"}</p>
                </div>
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    <IconCash className="w-5 h-5" />
                    gastado
                  </div>
                  <p>{data.spentAmount ? "$" + Number(data.spentAmount).toFixed(2) : "Sin Gasto"}</p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
        <section className="flex flex-col pt-6">
          <p className="mb-8 text-muted-foreground text-sm">Compras realizadas por este cliente</p>
          <CustomerDetailsTable orders={orders} />
        </section>
      </div>
    </>
  )
}
export default CustomerDetailsPage