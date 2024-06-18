import { getAllCustomers } from "@/actions/getAllCustomers"
import CustomerDialog from "@/components/CustomerDialog"
import CustomersTable from "@/components/CustomersTable"
import PageHeader from "@/components/layout/PageHeader"
import CreateCustomerButton from "@/components/CreateCustomerButton"

async function CustomersPage() {

  const { data, error } = await getAllCustomers()

  if (error) return <p>Error al obtener los clientes</p>

  return (
    <>
      <PageHeader title="Clientes" actions={<CreateCustomerButton />} />
      {data.length == 0 && (
        <div className="grow rounded border border-dashed border-slate-400 grid place-items-center">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay clientes creados todavía</p>
            <p className="text-sm text-muted-foreground mb-6">Podrás comenzar a operar en cuanto tengas al menos un cliente en tu lista de clientes</p>
          </div>
        </div>
      )}
      {data.length > 0 && <CustomersTable data={data} />}
      <CustomerDialog userId={data.id as string} />
    </>
  )
}

export default CustomersPage