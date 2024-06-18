"use client"

import { useProductDialogStore } from "@/stores/productDialogStore"
import { Button } from "./ui/button"
import { Edit } from "lucide-react"
import { EditProductButtonProps } from "@/lib/types"
import { useCustomerDialogStore } from "@/stores/useCustomerDialogStore"


const EditProductButton = ({ barcode, id }: EditProductButtonProps) => {

  const { open } = useProductDialogStore((state: any) => state)
  const { handleOpen } = useCustomerDialogStore((state: any) => state)


  const handleClickOpen = () => {
    handleOpen(true, "edit", id)
  }

  const handleClick = () => {
    open(true, "edit", barcode)
  }

  const handleClicKconditional = () => {
    if (barcode === undefined) handleClickOpen()
    else handleClick()
  }

  return (
    <Button onClick={handleClicKconditional} variant={"outline"} className="aspect-square p-0">
      <Edit className="aspect-square p-0" />
    </Button>
  )
}
export default EditProductButton