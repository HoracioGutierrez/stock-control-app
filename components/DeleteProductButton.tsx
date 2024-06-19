"use client"

import { Button } from "./ui/button"
import { Trash2, UndoDot } from "lucide-react"
import { DeleteProductButtonProps } from "@/lib/types"
import { useDialogStore } from "@/stores/generalDialog"


const DeleteProductButton = ({ active, barcode }: DeleteProductButtonProps) => {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    active ? setOpen("delete-product", barcode) : setOpen("activate-product", barcode)
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