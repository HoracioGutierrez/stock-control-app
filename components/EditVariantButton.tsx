"use client"

import { useProductDialogStore } from "@/stores/productDialogStore"
import { Button } from "./ui/button"
import { ListTreeIcon } from "lucide-react"

const EditVariantButton = () => {

  const { open } = useProductDialogStore((state: any) => state)

  const handleClick = () => {
    open(true, "variant")
  }

  return (
    <Button onClick={handleClick} variant={"outline"} className="aspect-square p-0" disabled>
      <ListTreeIcon className="aspect-square p-0" />
    </Button>
  )
}
export default EditVariantButton