import { getAllHistoryMovements } from "@/actions/getAllHistoryMovements"
import { auth } from "@/auth"
import CustomDataTable from "@/components/CustomDataTable"
import MovementsTable from "@/components/MovementsTable"
import PageTitle from "@/components/PageTitle"
import { Button } from "@/components/ui/button"

async function MovementsPage() {

  const session = await auth()

  if (session?.user.isAdmin === false) return <p>No tienes permisos para acceder a esta página</p>

  const { data, error } = await getAllHistoryMovements(session?.user.id as string)

  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Movimientos" />
      </div>
      <div>
        <MovementsTable data={data} />
      </div>
    </>
  )
}
export default MovementsPage