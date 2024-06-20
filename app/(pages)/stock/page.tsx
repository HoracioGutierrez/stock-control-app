import { getAllCashRegisters } from "@/actions/getAllCashRegisters"
import CustomDataTable from "@/components/CustomDataTable"
import CustomDialog from "@/components/CustomDialog"
import DialogTriggerButton from "@/components/DialogTriggerButton"
import NewCashRegisterForm from "@/components/NewCashRegisterForm"
import PageHeader from "@/components/layout/PageHeader"
import { PlusIcon } from "lucide-react"
import { auth } from "@/auth"

async function StockPage() {

  const session = await auth()
  const { data, error } = await getAllCashRegisters()

  return (
    <>
      <PageHeader title="Cajas" actions={session?.user.isAdmin
        ? <DialogTriggerButton dialogType="new-cash-register" text="Crear Caja" icon={<PlusIcon />} />
        : null
      } />
      <CustomDataTable
        data={data}
        type="cash-registers"
        filterColumn="label"
        filterKey="label"
      />
      <CustomDialog title="Crear Caja">
        <NewCashRegisterForm userId={session?.user.id as string} />
      </CustomDialog>
    </>
  )
}
export default StockPage