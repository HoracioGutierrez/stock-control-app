"use client"

import { useProductDialogStore } from "@/stores/productDialogStore"
import { Button } from "./ui/button"
import { Edit } from "lucide-react"
import { EditProductButtonProps } from "@/lib/types"
import { useCustomerDialogStore } from "@/stores/useCustomerDialogStore"
import { useDialogStore } from "@/stores/generalDialog"


const EditProductButton = ({ barcode, id }: EditProductButtonProps) => {

  const { setOpen } = useDialogStore((state: any) => state)


  const handleClickOpen = () => {
    setOpen("edit-customer", id)
  }

  const handleClick = () => {
    setOpen("edit-product", barcode)
  }

  const handleClicKconditional = () => {
    if (barcode === undefined) handleClickOpen()
    else handleClick()
  }

  return (
    <Button onClick={handleClicKconditional} variant={"ghost"} className="aspect-square p-0 text-muted-foreground hover:text-yellow-200">
      <Edit className="aspect-square p-0" />
    </Button>
  )
}
export default EditProductButton