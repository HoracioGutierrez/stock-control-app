import { getAllCustomers } from "@/actions/getAllCustomers"
import CustomerDialog from "@/components/CustomerDialog"
import CustomersTable from "@/components/CustomersTable"
import PageTitle from "@/components/PageTitle"
import CustomDialog from "@/components/CustomDialog"
import CreateCustomerButton from "@/components/CreateCustomerButton"
import NewCustomerForm from "@/components/NewCustomerForm"

async function CustomersPage() {

  const { data, error } = await getAllCustomers()

  if (error) return <p>Error al obtener los clientes</p>

  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Clientes" />
        <CreateCustomerButton />
      </div>
      {data.length == 0 && (
        <div className="grow rounded border border-dashed border-slate-400 grid place-items-center">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay clientes creados todavía</p>
            <p className="text-sm text-muted-foreground mb-6">Podrás comenzar a operar en cuanto tengas al menos un cliente en tu lista de clientes</p>
          </div>
        </div>
      )}
      {data.length > 0 && <CustomersTable data={data} />}
      <CustomDialog fullWidth title="Crear Cliente">
        <NewCustomerForm />
      </CustomDialog>
      <CustomerDialog />
    </>



  )
}

export default CustomersPage