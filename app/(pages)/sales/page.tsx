import PageTitle from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import { Pickaxe, PlusIcon } from "lucide-react"

function SalesPage() {
  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Ventas" />
      </div>
      <div className="grow roundedborder-slate-400 grid place-items-center">
        <div className="max-w-sm text-center flex flex-col gap-4 items-center text-muted-foreground">
          <Pickaxe width={35} height={35} className="animate-bounce"/>
          <p className="font-bold text-3xl">Pagina en desarrollo</p>
        </div>
      </div>
    </>
  )
}
export default SalesPage