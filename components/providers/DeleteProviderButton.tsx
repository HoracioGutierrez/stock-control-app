"use client"
import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "../ui/button"
import { Trash2, PackageCheck, PackageX } from "lucide-react"
import { DeleteButtonProps } from "@/lib/types"

function DeleteProviderButton({ active, id }: DeleteButtonProps) {
  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    active ? setOpen("delete-provider", id) : setOpen("activate-provider", id)
  }

  return (
    <Button variant={"ghost"} className="aspect-square p-0 group" onClick={handleClick}>
      {active
        ? <PackageX className="aspect-square p-0 text-muted-foreground group-hover:text-red-400" />
        : <PackageCheck className="aspect-square p-0 text-muted-foreground group-hover:text-green-400" />}
    </Button>
  )
}

export default DeleteProviderButton
