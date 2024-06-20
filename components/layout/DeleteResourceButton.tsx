"use client"

import { Trash2, UndoDot } from "lucide-react"
import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type DeleteResourceButtonProps = {
  active: boolean
  type?: string
  data?: any
  activeIcon?: JSX.Element
  inactiveIcon?: JSX.Element
  tooltip?: string
}

const DeleteResourceButton = ({ active, type, data, activeIcon, inactiveIcon , tooltip = "Tooltip" }: DeleteResourceButtonProps) => {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    active ? setOpen("delete-" + type, data) : setOpen("activate-" + type, data)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant={"ghost"} className="aspect-square p-0" onClick={handleClick}>
            {active
              ? activeIcon || <Trash2 className="aspect-square p-0 text-muted-foreground hover:text-red-400" />
              : inactiveIcon || <UndoDot className="aspect-square p-0 text-muted-foreground hover:text-green-400" />
            }
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  )
}
export default DeleteResourceButton