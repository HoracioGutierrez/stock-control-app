"use client"
import { useNewProductStore } from "@/stores/newProductStore"
import { Button } from "./ui/button"
import { Loader } from "lucide-react"

function NewProductButton() {

  const isLoading = useNewProductStore((state: any) => state.isLoading)

  return (
    <Button form="new-product-form" disabled={isLoading} className="flex items-center gap-2">
      {isLoading && <Loader className="animate-spin" />}
      <span>Guardar producto</span>
    </Button>
  )
}
export default NewProductButton