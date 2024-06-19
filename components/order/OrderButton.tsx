"use client"
import { useOrderStore } from "@/stores/orderStore"
import { Button } from "../ui/button"
import { useDialogStore } from "@/stores/generalDialog"

function OrderButton() {

  const { products } = useOrderStore((state: any) => state)
  const { setOpen } = useDialogStore((state: any) => state)

  if (products.length === 0) return null

  const handleClick = () => {
    setOpen("save-order")
  }

  return (
    <Button onClick={handleClick}>Guardar orden</Button>
  )
}
export default OrderButton