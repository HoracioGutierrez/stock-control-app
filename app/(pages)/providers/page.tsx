import ProvidersTable from "@/components/providers/ProvidersTable"
import { getAllProviders } from "@/actions/getAllProviders"
import PageHeader from "@/components/layout/PageHeader"
import { auth } from "@/auth"
import ProviderDialog from "@/components/providers/ProviderDialog"
import { IconAmbulance } from "@tabler/icons-react"
import CustomButton from "@/components/layout/CustomButton"
import { Truck } from "lucide-react"

async function ProvidersPage() {

  const session = await auth()
  const { data, error } = await getAllProviders()
  return (
    <>
      <PageHeader title="Proveedores" goBack icon={<Truck className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} actions={
        <>
          <CustomButton variant="ghost" className="p-2 group" tooltip="Crear Proveedor" dialogType="new-provider" >
            <IconAmbulance className="group-hover:text-green-500 w-7 h-7" />
          </CustomButton>
        </>
      } />
      <ProvidersTable data={data} />
      <ProviderDialog userId={session?.user.id as string} />
    </>
  )
}
export default ProvidersPage