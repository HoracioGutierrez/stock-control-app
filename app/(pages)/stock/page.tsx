import { getAllCashRegisters } from "@/actions/getAllCashRegisters"
import { auth } from "@/auth"
import CreateCashRegisterButton from "@/components/CreateCashRegisterButton"
import CustomDialog from "@/components/CustomDialog"
import NewCashRegisterForm from "@/components/NewCashRegisterForm"
import PageTitle from "@/components/PageTitle"

async function StockPage() {

  const session = await auth()
  const { data, error } = await getAllCashRegisters()

  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Caja" />
        {session?.user.isAdmin && (
          <CreateCashRegisterButton />  
        )}
      </div>
      {/* 
      Aca va la CustomTable
      */}
      <CustomDialog title="Crear Caja"> 
        <NewCashRegisterForm userId={session?.user.id as string} />
      </CustomDialog>
    </>
  )
}
export default StockPage