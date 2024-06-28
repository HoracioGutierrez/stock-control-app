import { getAllCashRegisters } from "@/actions/getAllCashRegisters"
import DialogTriggerButton from "@/components/DialogTriggerButton"
import PageHeader from "@/components/layout/PageHeader"
import { auth } from "@/auth"
import CashRegisterTable from "@/components/cashRegister/CashRegisterTable"
import CashRegisterDialog from "@/components/cashRegister/CashRegisterDialog"
import { IconDeviceDesktopPlus } from '@tabler/icons-react'

async function StockPage() {

  const session = await auth()
  const { data, error } = await getAllCashRegisters()

  return (
    <>
      <PageHeader title="Cajas" actions={session?.user.isAdmin
        ? <DialogTriggerButton dialogType="new-cash-register" text="Crear Caja" icon={<IconDeviceDesktopPlus />} />
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