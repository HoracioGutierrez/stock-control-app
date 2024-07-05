import { getAllCustomers } from "@/actions/getAllCustomers"
import CustomerDialog from "@/components/CustomerDialog"
import CustomersTable from "@/components/CustomersTable"
import PageHeader from "@/components/layout/PageHeader"
import { auth } from "@/auth"
import CustomButton from "@/components/layout/CustomButton"
import { UserRound, UserRoundPlusIcon } from "lucide-react"

async function CustomersPage() {

  const session = await auth()
  const { data, error } = await getAllCustomers()

  if (error) return <p>Error al obtener los clientes</p>

  return (
    <>
      <PageHeader title="Clientes" goBack icon={<UserRound className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} actions={
        <>
          <CustomButton className="p-2 group" dialogType="create-customer" variant="ghost" icon={<UserRoundPlusIcon className="group-hover:text-green-500" />}>
            <span className="md:block hidden">Crear Cliente</span>
          </CustomButton>
        </>
      } />
      {data.length >= 0 && <CustomersTable data={data} isAdmin={session?.user.isAdmin} />}
      <CustomerDialog />
    </>
  )
}

export default CustomersPage