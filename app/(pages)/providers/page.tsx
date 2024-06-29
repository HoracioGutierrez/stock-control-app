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
import CustomButton from "@/components/layout/CustomButton"

async function ProvidersPage() {

  const session = await auth()
  const { data, error } = await getAllProviders()
  console.log(data, error)
  return (
    <>
      <PageHeader title="Proveedores" actions={
        <>
          {/* <DialogTriggerButton dialogType="new-provider-order" text="Nueva orden de compra" icon={<PlusIcon />} /> */}
          {/*   <DialogTriggerButton dialogType="new-provider" text="Crear Proveedor" icon={<IconAmbulance className="w-7 h-7" />} /> */}
          <CustomButton  className="group" icon={<IconAmbulance className="group-hover:text-green-500 w-7 h-7" />} tooltip="Crear Proveedor" dialogType="new-provider" >
           <span className="text-muted-foreground">Crear Proveedor</span>
          </CustomButton>
        </>
      } />
      <ProvidersTable data={data} />
      <ProviderDialog userId={session?.user.id as string} />
    </>
  )
}
export default ProvidersPage