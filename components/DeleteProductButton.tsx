"use client"

import { useProductDialogStore } from "@/stores/productDialogStore"
import { Button } from "./ui/button"
import { Trash2, UndoDot } from "lucide-react"
import { DeleteProductButtonProps } from "@/lib/types"


const DeleteProductButton = ({ active, barcode }: DeleteProductButtonProps) => {

  const { open } = useProductDialogStore((state: any) => state)

  const handleClick = () => {
    open(true, active ? "delete" : "activate", barcode)
  }

  return (
    <Button variant={"ghost"} className="aspect-square p-0" onClick={handleClick}>
      {active
        ? <Trash2 className="aspect-square p-0 text-muted-foreground hover:text-red-400" />
        : <UndoDot className="aspect-square p-0 text-muted-foreground hover:text-green-400" />}
    </Button>
  )
}
export default DeleteProductButton