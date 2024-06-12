"use client"

import { useProductDialogStore } from "@/stores/productDialogStore"
import { Button } from "./ui/button"
import { Trash2, UndoDot } from "lucide-react"

type DeleteProductButtonProps = {
  active: boolean
  barcode: string
}

const DeleteProductButton = ({ active, barcode }: DeleteProductButtonProps) => {

  const { open } = useProductDialogStore((state: any) => state)

  const handleClick = () => {
    open(true, active ? "delete" : "activate", barcode)
  }

  return (
    <Button variant={"outline"} className="aspect-square p-0" onClick={handleClick}>
      {active
        ? <Trash2 className="aspect-square p-0" />
        : <UndoDot className="aspect-square p-0" />}
    </Button>
  )
}
export default DeleteProductButton