"use client"

import { useProductDialogStore } from "@/stores/productDialogStore"
import { Button } from "./ui/button"
import { Edit } from "lucide-react"
import { EditButtonProps } from "@/lib/types"
import { useCustomerDialogStore } from "@/stores/useCustomerDialogStore"
import { useDialogStore } from "@/stores/generalDialog"


const EditButton = ({ barcode, id, entity }: EditButtonProps) => {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    const action = "edit" + "-" + entity
    const idResolve = barcode ? barcode : id
    setOpen(action, idResolve)
  }

  return (
    <Button onClick={handleClick} variant={"ghost"} className="aspect-square p-0 text-muted-foreground hover:text-yellow-200">
      <Edit className="aspect-square p-0" />
    </Button>
  )
}
export default EditButton