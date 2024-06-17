import { getAllHistoryMovements } from "@/actions/getAllHistoryMovements"
import MovementsTable from "@/components/MovementsTable"
import PageHeader from "@/components/layout/PageHeader"
import { auth } from "@/auth"

async function MovementsPage() {

  const session = await auth()

  if (session?.user.isAdmin === false) return <p>No tienes permisos para acceder a esta página</p>

  const { data, error } = await getAllHistoryMovements(session?.user.id as string)

  return (
    <>
      <PageHeader title="Movimientos" />
      <MovementsTable data={data} />
    </>
  )
}
export default MovementsPage