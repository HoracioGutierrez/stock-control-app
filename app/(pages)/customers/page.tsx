import { getAllCustomers } from "@/actions/getAllCustomers"
import CustomerDialog from "@/components/CustomerDialog"
import CustomersTable from "@/components/CustomersTable"
import PageHeader from "@/components/layout/PageHeader"
import CreateCustomerButton from "@/components/customer/CreateCustomerButton"
import { auth } from "@/auth"

async function CustomersPage() {

  const session = await auth()
  const { data, error } = await getAllCustomers()

  if (error) return <p>Error al obtener los clientes</p>

  return (
    <>
      <PageHeader title="Clientes" actions={<CreateCustomerButton />} />
      {data.length == 0 && (
        <div className="place-items-center border-slate-400 grid border border-dashed rounded grow">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay clientes creados todavía</p>
            <p className="mb-6 text-muted-foreground text-sm">Podrás comenzar a operar en cuanto tengas al menos un cliente en tu lista de clientes</p>
          </div>
        </div>
      )}
      {data.length > 0 && <CustomersTable data={data} isAdmin={session?.user.isAdmin} />}
      <CustomerDialog />
    </>
  )
}

export default CustomersPage