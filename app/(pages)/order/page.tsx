import CancelOrderButton from "@/components/CancelOrderButton"
import OrderScanner from "@/components/OrderScanner"
import PageTitle from "@/components/PageTitle"

function OrderPage() {
  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Nueva orden" />
        <CancelOrderButton />
      </div>
      <OrderScanner />
    </>
  )
}
export default OrderPage