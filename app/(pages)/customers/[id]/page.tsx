import { getById } from "@/actions/getById"
import { getOrdersByCustomerId } from "@/actions/getOrdersByCustomerId"
import CustomDataTable from "@/components/CustomDataTable"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"

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
      <PageHeader title="Detalles del Cliente" goBack />
      {(!data || data.length == 0) && (
        <div className="place-items-center border-slate-400 grid border border-dashed rounded grow">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay clientes creados todavía</p>
            <p className="mb-6 text-muted-foreground text-sm">Podrás comenzar a operar tan pronto como agregues al menos un cliente a tu lista o crees uno nuevo.</p>
          </div>
        </div>
      )}
      {data && (
        <section>
          <Card className="bg-transparent p-0 border-none">
            <CardHeader className="p-0 pb-8">
              <CardDescription className="text-muted-foreground">Detalles del Cliente</CardDescription>
            </CardHeader>
            <CardContent className="gap-4 grid p-0">
              <div className="gap-2 gap-y-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <p className="text-muted-foreground">Nombre</p>
                  <p>{data.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Apellido</p>
                  <p>{data.lastName ? data.lastName : "Sin Apellido"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Teléfono</p>
                  <p>{data.phone ? data.phone : "Sin Teléfono"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p>{data.email ? data.email : "Sin Email"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dirección</p>
                  <p>{data.address ? data.address : "Sin Dirección"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Nombre de la compañía</p>
                  <p>{data.legalName ? data.legalName : "Sin Nombre de la Compañía"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">CUIT/CUIL</p>
                  <p>{data.cuitCuil ? data.cuitCuil : "Sin CUIT/CUIL"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
      {orders && orders.length > 0 && (
        <section className="my-16">
          <p className="text-muted-foreground">Compras realizadas por este cliente</p>
          <CustomDataTable
            data={orders}
            type="customer-orders"
            noFilter
          />
        </section>
      )}
    </>
  )
}
export default CustomerDetailsPage