"use client"

import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

type DialogTriggerButtonProps = {
  dialogType: string,
  children?: any,
  className?: string,
  icon?: JSX.Element,
  text?: string
}

const DialogTriggerButton = ({ dialogType, children, className, icon, text = "Trigger Dialog" }: DialogTriggerButtonProps) => {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen(dialogType)
  }

  return (
    <Button onClick={handleClick} className={cn("flex items-center gap-2 text-white dark:text-primary-foreground", className)}>
      {icon && icon}
      <span>{children ? children : text ? text : "Trigger Dialog"}</span>
    </Button>
  )
}

export default DialogTriggerButton