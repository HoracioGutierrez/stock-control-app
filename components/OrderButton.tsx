"use client"
import { useOrderStore } from "@/stores/orderStore"
import { Button } from "./ui/button"

function OrderButton() {

  const { products } = useOrderStore((state: any) => state)

  if (products.length === 0) return null

  return (
    <Button>Guardar</Button>
  )
}
export default OrderButton