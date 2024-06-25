import { getAllCashRegisters } from "@/actions/getAllCashRegisters"
import CustomDataTable from "@/components/CustomDataTable"
import CustomDialog from "@/components/CustomDialog"
import DialogTriggerButton from "@/components/DialogTriggerButton"
import NewCashRegisterForm from "@/components/NewCashRegisterForm"
import PageHeader from "@/components/layout/PageHeader"
import { PlusIcon } from "lucide-react"
import { auth } from "@/auth"
import CashRegisterTable from "@/components/cashRegister/CashRegisterTable"
import CashRegisterDialog from "@/components/cashRegister/CashRegisterDialog"
import {IconDeviceDesktopPlus} from '@tabler/icons-react'

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