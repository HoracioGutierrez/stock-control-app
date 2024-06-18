import { getAllCashRegisters } from "@/actions/getAllCashRegisters"
import { auth } from "@/auth"
import CreateCashRegisterButton from "@/components/CreateCashRegisterButton"
import CustomDialog from "@/components/CustomDialog"
import DialogTriggerButton from "@/components/DialogTriggerButton"
import NewCashRegisterForm from "@/components/NewCashRegisterForm"
import PageTitle from "@/components/PageTitle"
import CashRegisterTable from "@/components/cashRegister/CashRegisterTable"
import PageHeader from "@/components/layout/PageHeader"
import { PlusIcon } from "lucide-react"

async function StockPage() {

  const session = await auth()
  /* const { data, error } = await getAllCashRegisters() */

  return (
    <>
      <PageHeader title="Cajas" actions={session?.user.isAdmin
        ? <DialogTriggerButton dialogType="new-cash-register" text="Crear Caja" icon={<PlusIcon />} />
        : null
      } />
      <CashRegisterTable/>
      <CustomDialog title="Crear Caja" userId={session?.user.id as string}>
        <NewCashRegisterForm userId={session?.user.id as string} />
      </CustomDialog>
    </>
  )
}
export default StockPage