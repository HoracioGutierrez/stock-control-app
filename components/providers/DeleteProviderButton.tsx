"use client"
import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "../ui/button"
import { DeleteButtonProps } from "@/lib/types"
import { IconTruckOff, IconTruckReturn } from "@tabler/icons-react"

function DeleteProviderButton({ active, id }: DeleteButtonProps) {
  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    active ? setOpen("delete-provider", id) : setOpen("activate-provider", id)
  }

  return (
    <Button variant={"ghost"} className="aspect-square p-0 group" onClick={handleClick}>
      {active
        ? <IconTruckOff className="aspect-square p-0 text-muted-foreground group-hover:text-red-400" />
        : <IconTruckReturn className="aspect-square p-0 text-muted-foreground group-hover:text-green-400" />}
    </Button>
  )
}

export default DeleteProviderButton
