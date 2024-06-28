import { getAllCustomers } from "@/actions/getAllCustomers"
import CustomerDialog from "@/components/CustomerDialog"
import CustomersTable from "@/components/CustomersTable"
import PageHeader from "@/components/layout/PageHeader"
import CreateCustomerButton from "@/components/customer/CreateCustomerButton"
import { auth } from "@/auth"
import CustomButton from "@/components/layout/CustomButton"

async function CustomersPage() {

  const session = await auth()
  const { data, error } = await getAllCustomers()

  if (error) return <p>Error al obtener los clientes</p>

  return (
    <>
      <PageHeader title="Clientes" actions={<CreateCustomerButton />} />
      {data.length >= 0 && <CustomersTable data={data} isAdmin={session?.user.isAdmin} />}
      <CustomerDialog />
    </>
  )
}

export default CustomersPage