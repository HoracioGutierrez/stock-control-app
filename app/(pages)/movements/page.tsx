import { getAllHistoryMovements } from "@/actions/getAllHistoryMovements"
import MovementsTable from "@/components/MovementsTable"
import PageHeader from "@/components/layout/PageHeader"
import { auth } from "@/auth"
import { History } from "lucide-react"

async function MovementsPage() {

  const session = await auth()

  if (session?.user.isAdmin === false) return <p>No tienes permisos para acceder a esta página</p>

  const { data, error } = await getAllHistoryMovements(session?.user.id as string)

  return (
    <>
      <PageHeader title="Movimientos" goBack icon={<History className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} />
      {(!data || data.length == 0) && (
        <div className="place-items-center border-slate-400 grid border border-dashed rounded grow">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay movimientos todavía</p>
            <p className="mb-6 text-muted-foreground text-sm">Podrás comenzar a ver movimientos luego de realizar alguna accion en la aplicación</p>
          </div>
        </div>
      )}
      {data && data.length > 0 && <MovementsTable data={data} />}
    </>
  )
}
export default MovementsPage