import DialogTriggerButton from "@/components/DialogTriggerButton"
import PageHeader from "@/components/layout/PageHeader"
import CustomDialog from "@/components/CustomDialog"
import { Pickaxe, PlusIcon } from "lucide-react"
import { auth } from "@/auth"
import CreateProviderForm from "@/components/providers/CreateProviderForm"

async function ProvidersPage() {

  const session = await auth()

  return (
    <>
      <PageHeader title="Proveedores" actions={
        <DialogTriggerButton dialogType="new-provider" text="Crear Proveedor" icon={<PlusIcon />} />
      } />
      <div className="grow roundedborder-slate-400 grid place-items-center">
        <div className="max-w-sm text-center flex flex-col gap-4 items-center text-muted-foreground">
          <Pickaxe width={35} height={35} className="animate-bounce" />
          <p className="font-bold text-3xl">Pagina en desarrollo</p>
        </div>
      </div>
      <CustomDialog userId={session?.user.id as string} title="Crear Proveedor" fullWidth>
        <CreateProviderForm userId={session?.user.id as string}/>
      </CustomDialog>
    </>
  )
}
export default ProvidersPage