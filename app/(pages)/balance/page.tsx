import { getGeneralBalance } from "@/actions/getGeneralBalance"
import { auth } from "@/auth"
import PageTitle from "@/components/PageTitle"
import BalanceDialog from "@/components/balance/BalanceDialog"
import BalanceTable from "@/components/balance/BalanceTable"
import CustomButton from "@/components/layout/CustomButton"
import PageHeader from "@/components/layout/PageHeader"
import { IconChartHistogram } from "@tabler/icons-react"
import { ArrowUpDown } from "lucide-react"

async function BalancePage() {

  const session = await auth()
  const { data, error } = await getGeneralBalance()

  return (
    <>
      <PageHeader title="Balance" goBack icon={<IconChartHistogram className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} actions={
        <CustomButton tooltip="Ingresar dinero manualmente a la caja actual" dialogType="manual-income" className="p-2 group" variant="ghost" icon={<ArrowUpDown className="group-hover:text-green-500" />}>
          <span className="md:block hidden">Ingreso/Retiro Manual</span>
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