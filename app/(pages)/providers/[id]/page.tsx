import { getProviderDetails } from "@/actions/getProviderDetails"
import PageHeader from "@/components/layout/PageHeader"
import PurchaseOrderTable from "@/components/providers/PurchaseOrderTable"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { IconId, IconMail } from "@tabler/icons-react"
import { Home, Phone, Truck, User2Icon, Warehouse } from "lucide-react"

type Props = {
  params: {
    id: string
  }
}
const ProviderDetailsPage = async ({ params: { id } }: Props) => {

  const { data, error } = await getProviderDetails(id)

  return (
    <>
      <PageHeader title="Detalles del Proveedor" goBack icon={<Truck className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} />
      {(!data || data.length == 0) && (
        <div className="place-items-center border-slate-400 grid border border-dashed rounded grow">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay proveedores creados todavía</p>
            <p className="mb-6 text-muted-foreground text-sm">Podrás comenzar a ver proveedores luego de crear uno.</p>
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
                    {data.provider.name ? data.provider.name : "Sin Nombre"}
                    {data.provider.lastName && ", "}
                    {data.provider.lastName ? data.provider.lastName : "Sin Apellido"}
                  </p>
                </div>
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    <Phone className="w-5 h-5" />
                    teléfono
                  </div>
                  <p>{data.provider.phone ? data.provider.phone : "Sin Teléfono"}</p>
                </div>
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    <IconMail className="w-5 h-5" />
                    email
                  </div>
                  <p className="truncate">{data.provider.email ? data.provider.email : "Sin Email"}</p>
                </div>
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    <Home className="w-5 h-5" />
                    dirección
                  </div>
                  <p>{data.provider.address ? data.provider.address : "Sin Dirección"}</p>
                </div>
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    <IconId className="w-5 h-5" />
                    cuit/cuil
                  </div>
                  <p>{data.provider.cuitCuil ? data.provider.cuitCuil : "Sin Cuit/CUIL"}</p>
                </div>
                <div className="items-center place-content-center gap-4 grid grid-cols-[65px_1fr]">
                  <div className="flex flex-col justify-center items-center text-muted-foreground text-sm">
                    <Warehouse className="w-5 h-5" />
                    Empresa
                  </div>
                  <p>{data.provider.companyName ? data.provider.companyName : "Sin Empresa"}</p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
        <section className="flex flex-col pt-6">
          <p className="mb-8 text-muted-foreground text-sm">Ordenes de compra</p>
          <PurchaseOrderTable data={data.purchaseOrders} />
        </section>
      </div>
    </>
  )
}
export default ProviderDetailsPage