import { getAllCustomers } from "@/actions/getAllCustomers"
import PageTitle from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function ClientsPage() {

  const { data, error } = await getAllCustomers()

  if (error) return <p>Error al obtener los clientes</p>

  console.log(data)

  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Clientes" />
        <Button asChild>
          <Link href="/customers/new">
            Crear Cliente
          </Link>
        </Button>
      </div>
      {data.length === 0 && (
        <div className="grow rounded border border-dashed border-slate-400 grid place-items-center">
       
    {/*       <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay clientes creados todavía</p>
            <Button asChild>
              <Link href="/products/new">
                Crear producto
              </Link>
            </Button>
          </div> */}
        </div>
      )}
    </>
  )
}
export default ClientsPage