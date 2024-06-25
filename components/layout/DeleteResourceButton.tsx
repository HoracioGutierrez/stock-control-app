"use client"

import { Trash2, UndoDot } from "lucide-react"
import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { IconPlugX, IconPlug } from '@tabler/icons-react'


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
        <TooltipTrigger asChild>
          <Button variant={"ghost"} className="p-0 aspect-square" onClick={handleClick}>
            {active
              ? activeIcon || <Trash2 className="p-0 text-muted-foreground hover:text-red-400 aspect-square" />
              : inactiveIcon || <UndoDot className="p-0 text-muted-foreground hover:text-green-400 aspect-square" />
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