"use client"

import { useProductDialogStore } from "@/stores/productDialogStore"
import { Button } from "./ui/button"

const CreateProductButton = () => {

  const { open } = useProductDialogStore((state: any) => state)

  const handleClick = () => {
    open(true, "new")
  }

  return (
    <Button onClick={handleClick}>
      Crear producto
    </Button>
  )
}
export default CreateProductButton