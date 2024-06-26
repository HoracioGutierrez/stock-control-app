import CreateProviderForm from "@/components/providers/CreateProviderForm"
import ProvidersTable from "@/components/providers/ProvidersTable"
import DialogTriggerButton from "@/components/DialogTriggerButton"
import { getAllProviders } from "@/actions/getAllProviders"
import PageHeader from "@/components/layout/PageHeader"
import CustomDialog from "@/components/CustomDialog"
import { PackagePlus } from "lucide-react"
import { auth } from "@/auth"
import ProviderDialog from "@/components/providers/ProviderDialog"
import { IconAmbulance } from "@tabler/icons-react"

async function ProvidersPage() {

  const session = await auth()
  const { data, error } = await getAllProviders()
  return (
    <>
      <PageHeader title="Proveedores" actions={
        <>
          {/* <DialogTriggerButton dialogType="new-provider-order" text="Nueva orden de compra" icon={<PlusIcon />} /> */}
          <DialogTriggerButton dialogType="new-provider" text="Crear Proveedor" icon={<IconAmbulance className="w-7 h-7" />} />
        </>
      } />
      {data.length == 0 && (
        <div className="place-items-center border-slate-400 grid border border-dashed rounded grow">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay proveedores todavía</p>
            <p className="mb-6 text-muted-foreground text-sm">Podrás comenzar a ver proveedores luego de crear uno.</p>
          </div>
        </div>
      )}
      {data.length > 0 && <ProvidersTable data={data} />}
      <ProviderDialog userId={session?.user.id as string} />
    </>
  )
}
export default ProvidersPage