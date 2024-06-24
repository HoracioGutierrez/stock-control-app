"use client"
import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "../ui/button"
import { X } from "lucide-react"

type CloseCashRegisterButtonProps = {
}

const CloseCashRegisterButton = ({ }: CloseCashRegisterButtonProps) => {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen("close-cash-register")
  }

  return (
    <Button onClick={handleClick} className="flex gap-2 col-span-2 lg:col-span-1 text-white dark:text-primary-foreground">
      <X/>
      Cerrar Caja
    </Button>
  )
}
export default CloseCashRegisterButton