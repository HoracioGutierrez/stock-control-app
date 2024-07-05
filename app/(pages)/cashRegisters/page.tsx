import { getAllCashRegisters } from "@/actions/getAllCashRegisters"
import PageHeader from "@/components/layout/PageHeader"
import { auth } from "@/auth"
import CashRegisterTable from "@/components/cashRegister/CashRegisterTable"
import CashRegisterDialog from "@/components/cashRegister/CashRegisterDialog"
import { IconDeviceDesktopDollar, IconDeviceDesktopPlus } from '@tabler/icons-react'
import CustomButton from "@/components/layout/CustomButton"
import { ArrowUpDown } from "lucide-react"

async function StockPage() {

  const session = await auth()
  const { data, error } = await getAllCashRegisters()

  return (
    <>
      <PageHeader icon={<IconDeviceDesktopDollar className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} goBack title="Cajas" actions={session?.user.isAdmin
        ? (
          <>
            <CustomButton variant="ghost" className="p-2 group" dialogType="manual-income" tooltip="Ingresar dinero manualmente a la caja actual">
              <ArrowUpDown className="group-hover:text-green-500" />
            </CustomButton>
            
            <CustomButton variant="ghost" className="p-2 group" dialogType="new-cash-register" tooltip="Crear una nueva caja">
              <IconDeviceDesktopPlus className="group-hover:text-green-500" />
            </CustomButton>
          </>
        )
        : null
      } />
      {(!data || data.length == 0) && (
        <div className="place-items-center border-slate-400 grid border border-dashed rounded grow">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay cajas creadas todavía</p>
            <p className="mb-6 text-muted-foreground text-sm">Podrás comenzar a vender en cuanto tengas al menos una caja abierta o crees una nueva caja.</p>
          </div>
        </div>
      )}
      {data?.length > 0 && <CashRegisterTable data={data} isAdmin={session?.user.isAdmin} />}
      <CashRegisterDialog userId={session?.user.id as string} data={data} />
    </>
  )
}
export default StockPage