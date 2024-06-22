import CreateProviderForm from "@/components/providers/CreateProviderForm"
import ProvidersTable from "@/components/providers/ProvidersTable"
import DialogTriggerButton from "@/components/DialogTriggerButton"
import { getAllProviders } from "@/actions/getAllProviders"
import PageHeader from "@/components/layout/PageHeader"
import CustomDialog from "@/components/CustomDialog"
import { PlusIcon } from "lucide-react"
import { auth } from "@/auth"

async function ProvidersPage() {

  const session = await auth()
  const { data, error } = await getAllProviders()
  console.log(data)
  return (
    <>
      <PageHeader title="Proveedores" actions={
        <DialogTriggerButton dialogType="new-provider" text="Crear Proveedor" icon={<PlusIcon />} />
      } />
      <ProvidersTable data={data} />
      <CustomDialog title="Crear Proveedor" fullWidth>
        <CreateProviderForm userId={session?.user.id as string} />
      </CustomDialog>
    </>
  )
}
export default ProvidersPage