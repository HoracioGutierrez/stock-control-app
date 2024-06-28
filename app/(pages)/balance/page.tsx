import { getGeneralBalance } from "@/actions/getGeneralBalance"
import { auth } from "@/auth"
import PageTitle from "@/components/PageTitle"
import BalanceDialog from "@/components/balance/BalanceDialog"
import BalanceTable from "@/components/balance/BalanceTable"
import CustomButton from "@/components/layout/CustomButton"
import PageHeader from "@/components/layout/PageHeader"

async function BalancePage() {

  const session = await auth()
  const { data, error } = await getGeneralBalance()

  return (
    <>
      <PageHeader title="Balance" actions={
        <CustomButton tooltip="Ingresar dinero manualmente a la caja actual" dialogType="manual-income" className="truncate">
          Ingreso/Egreso Manual
        </CustomButton>
      } />
      {(!data || data.length == 0) && (
        <div className="place-items-center border-slate-400 grid border border-dashed rounded grow">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay balance general</p>
            <p className="mb-6 text-muted-foreground text-sm">Podrás ver el balance general de la cuenta de tu usuario o crear uno nuevo.</p>
          </div>
        </div>
      )}
      {data && data.length > 0 && <BalanceTable data={data} />}
      <BalanceDialog userId={session?.user.id as string} />
    </>
  )
}
export default BalancePage