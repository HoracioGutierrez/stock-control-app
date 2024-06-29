import { getProviderDetails } from "@/actions/getProviderDetails"
import CustomDataTable from "@/components/CustomDataTable"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type Props = {
  params: {
    id: string
  }
}
const ProviderDetailsPage = async ({ params: { id } }: Props) => {

  const { data, error } = await getProviderDetails(id)

  return (
    <>
      <PageHeader title="Detalles del Proveedor" goBack />
      {(!data || data.length == 0) && (
        <div className="place-items-center border-slate-400 grid border border-dashed rounded grow">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay proveedores creados todavía</p>
            <p className="mb-6 text-muted-foreground text-sm">Podrás comenzar a ver proveedores luego de crear uno.</p>
          </div>
        </div>
      )}
      {data && (
        <section>
          <Card className="bg-transparent p-0 border-none">
            {/* <CardHeader className="p-0 pb-8">
              <CardDescription className="text-muted-foreground">Detalles del Proveedor</CardDescription>
            </CardHeader> */}
            <CardContent className="gap-4 grid p-0">
              <div className="gap-2 gap-y-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <p className="text-muted-foreground">Nombre</p>
                  <p>{data.provider.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Apellido</p>
                  <p>{data.provider.lastName ? data.provider.lastName : "Sin Apellido"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Teléfono</p>
                  <p>{data.provider.phone ? data.provider.phone : "Sin Teléfono"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p>{data.provider.email ? data.provider.email : "Sin Email"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dirección</p>
                  <p>{data.provider.address ? data.provider.address : "Sin Dirección"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cuit/CUIL</p>
                  <p>{data.provider.cuitCuil ? data.provider.cuitCuil : "Sin Cuit/CUIL"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
      {/* <Separator className="my-8" /> */}
      <section className="my-16">
        <p className="text-muted-foreground">Ordenes de compra</p>
        <CustomDataTable
          data={data.purchaseOrders}
          type="purchase-orders"
          noFilter
        />
      </section>
    </>
  )
}
export default ProviderDetailsPage