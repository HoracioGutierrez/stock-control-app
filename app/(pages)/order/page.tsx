import { getCashRegisterByUserId } from "@/actions/getCashRegisterByUserId"
import CloseCashRegisterButton from "@/components/cashRegister/CloseCashRegisterButton"
import OpenCashRegisterButton from "@/components/OpenCashRegisterButton"
import { getAllCashRegisters } from "@/actions/getAllCashRegisters"
import CancelOrderButton from "@/components/order/CancelOrderButton"
import OrderButton from "@/components/order/OrderButton"
import PageHeader from "@/components/layout/PageHeader"
import OrderScanner from "@/components/order/OrderScanner"
import OrderDialog from "@/components/OrderDialog"
import { auth } from "@/auth"
import { ShoppingBasket } from "lucide-react"

async function OrderPage() {

  const session = await auth()
  const { data, error } = await getCashRegisterByUserId(session?.user.id as string)
  let cashRegisters = []

  if (!data) {
    const { data } = await getAllCashRegisters()
    cashRegisters = data
  }
  
  console.log(data)
  return (
    <>
      <PageHeader
        title={`Nueva Orden ${data ? `: ${data.label}` : ""}`}
        subtitle={data ? data.openedById : ""}
        goBack
        icon={<ShoppingBasket className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />}
      />
      {data && <OrderScanner data={data} />}
      {!data && (
        <div className="place-items-center border-slate-400 grid border border-dashed rounded grow">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay cajas abiertas</p>
            <p className="mb-6 text-muted-foreground text-sm">Podrás comenzar a vender en cuanto tengas al menos una caja abierta o crees una nueva</p>
            <OpenCashRegisterButton />
          </div>
        </div>
      )}
      <OrderDialog userId={session?.user.id as string} data={cashRegisters} cashRegisters={data} />
    </>
  )
}
export default OrderPage