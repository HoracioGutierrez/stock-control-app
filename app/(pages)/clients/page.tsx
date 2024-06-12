import PageTitle from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function ClientsPage() {
  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Clientes" />
        <Button asChild>
          <Link href="/clients/new">
            Crear Cliente
          </Link>
        </Button>
      </div>
    </>
  )
}
export default ClientsPage