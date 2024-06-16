"use client"
import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "./ui/button"
import { ShoppingBasket } from "lucide-react"

type OpenCashRegisterButtonProps = {
}

const OpenCashRegisterButton = ({ }: OpenCashRegisterButtonProps) => {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen("open-cash-register")
  }

  return (
    <Button onClick={handleClick} className="text-white dark:text-primary-foreground flex gap-2 mx-auto">
      <ShoppingBasket />
      Abrir Caja
    </Button>
  )
}
export default OpenCashRegisterButton