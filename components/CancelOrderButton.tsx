"use client"
import { useOrderStore } from "@/stores/orderStore"
import { Button } from "./ui/button"

function CancelOrderButton() {

  const { cancelOrder , products } = useOrderStore((state: any) => state)

  return (
    <Button onClick={cancelOrder} disabled={products.length === 0}>
      Cancelar la orden
    </Button>
  )
}
export default CancelOrderButton