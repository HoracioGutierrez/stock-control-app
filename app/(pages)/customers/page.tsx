import { getAllCustomers } from "@/actions/getAllCustomers"
import CustomerDialog from "@/components/CustomerDialog"
import CustomersTable from "@/components/CustomersTable"
import PageTitle from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UserRoundPlusIcon } from "lucide-react"

async function CustomersPage() {

  const { data, error } = await getAllCustomers()

  if (error) return <p>Error al obtener los clientes</p>

  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Clientes" />
        <Button asChild className="flex items-center gap-2 text-white dark:text-primary-foreground">
          <Link href="/customers/new">
            <UserRoundPlusIcon className="h-6 w-6 " />
            Crear Cliente
          </Link>
        </Button>
      </div>
      <CustomersTable data={data} />
      <CustomerDialog />
    </>
  )
}

export default CustomersPage