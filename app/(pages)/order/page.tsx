import { getAllCashRegisters } from "@/actions/getAllCashRegisters"
import { getCashRegisterByUserId } from "@/actions/getCashRegisterByUserId"
import { auth } from "@/auth"
import CancelOrderButton from "@/components/CancelOrderButton"
import CustomDialog from "@/components/CustomDialog"
import OpenCashRegisterButton from "@/components/OpenCashRegisterButton"
import OpenCashRegisterForm from "@/components/OpenCashRegisterForm"
import OrderButton from "@/components/OrderButton"
import OrderScanner from "@/components/OrderScanner"
import PageTitle from "@/components/PageTitle"

async function OrderPage() {

  const session = await auth()
  const { data, error } = await getCashRegisterByUserId(session?.user.id as string)
  let cashRegisters = []

  if (!data) {
    const { data } = await getAllCashRegisters()
    cashRegisters = data
  }

  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Nueva orden" />
        <div className="flex items-center gap-2">
          {/* <OrderButton />
          <CancelOrderButton /> */}
        </div>
      </div>
      {/* <OrderScanner /> */}
      {!data && (
        <div className="grow rounded border border-dashed border-slate-400 grid place-items-center">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay cajas abiertas</p>
            <p className="text-sm text-muted-foreground mb-6">Podrás comenzar a vender en cuanto tengas al menos una caja abierta</p>
            <OpenCashRegisterButton />
          </div>
        </div>
      )}
      {!data && (
        <CustomDialog title="Abrir Caja" userId={session?.user.id as string}>
          <OpenCashRegisterForm userId={session?.user.id as string} data={cashRegisters} />
        </CustomDialog>
      )}
    </>
  )
}
export default OrderPage