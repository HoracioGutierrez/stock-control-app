import ProvidersTable from "@/components/providers/ProvidersTable"
import { getAllProviders } from "@/actions/getAllProviders"
import PageHeader from "@/components/layout/PageHeader"
import { auth } from "@/auth"
import ProviderDialog from "@/components/providers/ProviderDialog"
import { IconAmbulance } from "@tabler/icons-react"
import CustomButton from "@/components/layout/CustomButton"

async function ProvidersPage() {

  const session = await auth()
  const { data, error } = await getAllProviders()
  return (
    <>
      <PageHeader title="Proveedores" actions={
        <>
          <CustomButton className="group" icon={<IconAmbulance className="group-hover:text-green-500 w-7 h-7" />} tooltip="Crear Proveedor" dialogType="new-provider" >
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