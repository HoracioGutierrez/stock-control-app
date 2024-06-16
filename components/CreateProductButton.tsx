"use client"

import { useProductDialogStore } from "@/stores/productDialogStore"
import { Button } from "./ui/button"
import { Barcode, Plus } from "lucide-react"

const CreateProductButton = () => {

  const { open } = useProductDialogStore((state: any) => state)

  const handleClick = () => {
    open(true, "new")
  }

  return (
    <Button onClick={handleClick} className="flex items-center gap-2 text-white dark:text-primary-foreground">
      <Plus/>
      Crear producto
    </Button>
  )
}
export default CreateProductButton