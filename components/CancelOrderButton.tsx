"use client"
import { useOrderStore } from "@/stores/orderStore"
import { Button } from "./ui/button"

function CancelOrderButton() {

  const { setProducts, setTotal, products } = useOrderStore((state: any) => ({ products: state.products, setProducts: state.setProducts, setTotal: state.setTotal }))

  const handleCancel = () => {
    setProducts([])
    setTotal(0)
  }

  return (
    <Button onClick={handleCancel} disabled={products.length === 0}>
      Cancelar la orden
    </Button>
  )
}
export default CancelOrderButton