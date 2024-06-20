"use client"

import { Trash2, UndoDot } from "lucide-react"
import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "../ui/button"

type DeleteResourceButtonProps = {
  active: boolean
  type?: string
  data?: any
  activeIcon?: JSX.Element
  inactiveIcon?: JSX.Element
}

const DeleteResourceButton = ({ active, type, data, activeIcon, inactiveIcon }: DeleteResourceButtonProps) => {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    active ? setOpen("delete-" + type, data) : setOpen("activate-" + type, data)
  }

  return (
    <Button variant={"ghost"} className="aspect-square p-0" onClick={handleClick}>
      {active
        ? activeIcon || <Trash2 className="aspect-square p-0 text-muted-foreground hover:text-red-400" />
        : inactiveIcon || <UndoDot className="aspect-square p-0 text-muted-foreground hover:text-green-400" />
      }
    </Button>
  )
}
export default DeleteResourceButton