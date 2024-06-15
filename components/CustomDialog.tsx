"use client"

import { useDialogStore } from "@/stores/generalDialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { cn } from "@/lib/utils"

type CustomDialogProps = {
  fullWidth?: boolean
  title? : string,
  children? : any,
  userId : string
}

function CustomDialog({ fullWidth = false , title = "Custom Dialog" , children , userId }: CustomDialogProps) {

  const { isOpen, setClose } = useDialogStore((state: any) => state)

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent className={cn(fullWidth && "max-w-screen-lg")}>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog