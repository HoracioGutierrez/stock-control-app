"use client"
import { useOrderStore } from "@/stores/orderStore"
import { Button } from "../ui/button"
import { useDialogStore } from "@/stores/generalDialog"

function OrderButton() {

  const { products } = useOrderStore((state: any) => state)
  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen("save-order")
  }

  return (
    <Button onClick={handleClick} disabled={products.length === 0}>Guardar orden</Button>
  )
}
export default OrderButton