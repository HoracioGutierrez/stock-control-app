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
      <CashRegisterTable data={data} isAdmin={session?.user.isAdmin} />
      <CashRegisterDialog userId={session?.user.id as string} data={data} />
    </>
  )
}
export default StockPage