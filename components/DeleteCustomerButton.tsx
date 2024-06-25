"use client"
import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "./ui/button"
import { UserRoundX, UserRoundCheck } from "lucide-react"
import { DeleteButtonProps } from "@/lib/types"
import {IconUserX, IconUserCheck} from '@tabler/icons-react'

function DeleteCustomerButton({ active, id }: DeleteButtonProps) {
  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    active ? setOpen("delete-customer", id) : setOpen("activate-customer", id)
  }

  return (
    <Button variant={"ghost"} className="aspect-square p-0" onClick={handleClick}>
      {active
        ? <UserRoundX className="aspect-square p-0 text-muted-foreground hover:text-red-400" />
        : <UserRoundCheck className="aspect-square p-0 text-muted-foreground hover:text-green-400" />}
    </Button>
  )
}

export default DeleteCustomerButton