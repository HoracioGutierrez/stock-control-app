"use client"

import { Button } from "./ui/button"
import { ListTreeIcon } from "lucide-react"
import { EditVariantButtonProps } from "@/lib/types"
import { useDialogStore } from "@/stores/generalDialog"


const EditVariantButton = ({ barcode }: EditVariantButtonProps) => {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen("variant", barcode)
  }

  return (
    <Button onClick={handleClick} variant={"ghost"} className="aspect-square p-0 text-muted-foreground hover:text-yellow-200">
      <ListTreeIcon className="aspect-square p-0" />
    </Button>
  )
}
export default EditVariantButton