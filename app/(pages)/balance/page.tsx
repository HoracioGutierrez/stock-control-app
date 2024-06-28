import { getGeneralBalance } from "@/actions/getGeneralBalance"
import { auth } from "@/auth"
import PageTitle from "@/components/PageTitle"
import BalanceTable from "@/components/balance/BalanceTable"

async function page() {

  const session = await auth()
  const { data, error } = await getGeneralBalance()

  return (
    <>
      <PageTitle title="Balance" />
      {(!data || data.length == 0) && (
        <div className="place-items-center border-slate-400 grid border border-dashed rounded grow">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay balance general</p>
            <p className="mb-6 text-muted-foreground text-sm">Podrás ver el balance general de la cuenta de tu usuario o crear uno nuevo.</p>
          </div>
        </div>
      )}
      {data && data.length > 0 && <BalanceTable data={data} />}
    </>
  )
}
export default page