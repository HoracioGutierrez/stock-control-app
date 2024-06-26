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
    <Button variant={"ghost"} className="aspect-square p-0 group" onClick={handleClick}>
      {active
        ? <Trash2 className="aspect-square p-0 text-muted-foreground group-hover:text-red-400 aspect-square" />
        : <UndoDot className="aspect-square p-0 text-muted-foreground group-hover:text-green-400 aspect-square" />}
    </Button>
  )
}
export default DeleteProductButton