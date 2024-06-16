"use client"

import { useProductDialogStore } from "@/stores/productDialogStore"
import { Button } from "./ui/button"
import { Edit } from "lucide-react"
import { EditProductButtonProps } from "@/lib/types"


const EditProductButton = ({ barcode }: EditProductButtonProps) => {

  const { open } = useProductDialogStore((state: any) => state)

  const handleClick = () => {
    open(true, "edit", barcode)
  }

  return (
    <Button onClick={handleClick} variant={"ghost"} className="aspect-square p-0 text-muted-foreground hover:text-yellow-200">
      <Edit className="aspect-square p-0" />
    </Button>
  )
}
export default EditProductButton