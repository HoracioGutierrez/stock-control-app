import { getCashRegisterByUserId } from "@/actions/getCashRegisterByUserId"
import CloseCashRegisterButton from "@/components/CloseCashRegisterButton"
import OpenCashRegisterButton from "@/components/OpenCashRegisterButton"
import { getAllCashRegisters } from "@/actions/getAllCashRegisters"
import CancelOrderButton from "@/components/CancelOrderButton"
import PageHeader from "@/components/layout/PageHeader"
import OrderScanner from "@/components/OrderScanner"
import OrderButton from "@/components/OrderButton"
import OrderDialog from "@/components/OrderDialog"
import PageTitle from "@/components/PageTitle"
import { auth } from "@/auth"

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
      <PageHeader title={`Nueva Orden ${data ? `: ${data.label}` : ""}`} actions={
        <div className="flex items-center gap-2">
          {data && (
            <>
              <OrderButton />
              <CancelOrderButton />
              <CloseCashRegisterButton />
            </>
          )}
        </div>
      } />
      {data && <OrderScanner data={data} />}
      {!data && (
        <div className="grow rounded border border-dashed border-slate-400 grid place-items-center">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay cajas abiertas</p>
            <p className="text-sm text-muted-foreground mb-6">Podrás comenzar a vender en cuanto tengas al menos una caja abierta</p>
            <OpenCashRegisterButton />
          </div>
        </div>
      )}
      <OrderDialog userId={session?.user.id as string} data={cashRegisters} cashRegisters={data} />
    </>
  )
}
export default OrderPage