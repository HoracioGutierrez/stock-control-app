import CancelOrderButton from "@/components/CancelOrderButton"
import OrderButton from "@/components/OrderButton"
import OrderScanner from "@/components/OrderScanner"
import PageTitle from "@/components/PageTitle"

function OrderPage() {
  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Nueva orden" />
        <div className="flex items-center gap-2">
          <OrderButton />
          <CancelOrderButton />
        </div>
      </div>
      <OrderScanner />
    </>
  )
}
export default OrderPage