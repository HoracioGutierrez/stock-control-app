"use client"

import { useProductDialogStore } from "@/stores/productDialogStore"
import { Button } from "./ui/button"
import { ListTreeIcon } from "lucide-react"

type EditVariantButtonProps = {
  barcode: string
}

const EditVariantButton = ({ barcode }: EditVariantButtonProps) => {

  const { open } = useProductDialogStore((state: any) => state)

  const handleClick = () => {
    open(true, "variant", barcode)
  }

  return (
    <Button onClick={handleClick} variant={"outline"} className="aspect-square p-0">
      <ListTreeIcon className="aspect-square p-0" />
    </Button>
  )
}
export default EditVariantButton