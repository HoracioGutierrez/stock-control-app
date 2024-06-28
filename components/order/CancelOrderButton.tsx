"use client"
import { useOrderStore } from "@/stores/orderStore"
import { Button } from "../ui/button"
import CustomButton from "../layout/CustomButton"

function CancelOrderButton() {

  const { cancelOrder, products } = useOrderStore((state: any) => state)

  return (
    <CustomButton onClick={cancelOrder} disabled={products.length === 0} className="bg-red-500 text-secondary-foreground" tooltip="Cancelar la orden actual. No se guardará la orden y se borraran los productos seleccionados.">
      Cancelar la orden
    </CustomButton>
  )
}
export default CancelOrderButton