"use client"

import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { useDialogStore } from "@/stores/generalDialog"
import { PackagePlus } from "lucide-react"

const CreateProductButton = () => {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen("new-product")
  }

  return (
    <Button onClick={handleClick} className="flex items-center gap-2 text-white dark:text-primary-foreground">
      <PackagePlus className="p-0 text-primary-foreground" />
      Crear producto
    </Button>
  )
}
export default CreateProductButton