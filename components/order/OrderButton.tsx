"use client"
import { useOrderStore } from "@/stores/orderStore"
import { Button } from "../ui/button"
import { useDialogStore } from "@/stores/generalDialog"
import CustomButton from "../layout/CustomButton"

function OrderButton() {

  const { products } = useOrderStore((state: any) => state)
  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen("save-order")
  }

  return (
    <CustomButton
      disabled={products.length === 0}
      onClick={handleClick}
      className="bg-green-500 text-secondary-foreground"
      tooltip="Terminar la compra y guardar la orden"
    >
      Guardar Orden
    </CustomButton>
  )
}
export default OrderButton