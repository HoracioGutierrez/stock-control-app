import OrderScanner from "@/components/OrderScanner"
import PageTitle from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function OrderPage() {
  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Nueva orden" />
        <Button asChild>
          <Link href="/products/new">
            Cancelar la orden
          </Link>
        </Button>
      </div>
      <OrderScanner />
    </>
  )
}
export default OrderPage