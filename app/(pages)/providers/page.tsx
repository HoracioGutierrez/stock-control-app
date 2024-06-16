import PageTitle from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import { Pickaxe, PlusIcon } from "lucide-react"

function ProvidersPage() {
  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Proveedores" />
        <Button className="flex items-center gap-2 text-white dark:text-primary-foreground" disabled>
          <PlusIcon />
          <span>Crear Proveedor</span>
        </Button>
      </div>
      <div className="grow roundedborder-slate-400 grid place-items-center">
        <div className="max-w-sm text-center flex flex-col gap-4 items-center text-muted-foreground">
          <Pickaxe width={35} height={35} className="animate-bounce" />
          <p className="font-bold text-3xl">Pagina en desarrollo</p>
        </div>
      </div>
    </>
  )
}
export default ProvidersPage