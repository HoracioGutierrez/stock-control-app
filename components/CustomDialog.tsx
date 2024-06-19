"use client"

import { useDialogStore } from "@/stores/generalDialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { cn } from "@/lib/utils"

type CustomDialogProps = {
  fullWidth?: boolean
  title?: string,
  children?: any,
  render?: any,
}

function CustomDialog({ fullWidth = false, title = "Custom Dialog", children, render }: CustomDialogProps) {

  const { isOpen, setClose, type } = useDialogStore((state: any) => state)

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent className={cn(fullWidth && "max-w-screen-lg")}>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {title}
          </DialogTitle>
        </DialogHeader>
        {!render && children}
        {render && render(type)}
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog