"use client"
import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "./ui/button"

type CloseCashRegisterButtonProps = {
}

const CloseCashRegisterButton = ({ }: CloseCashRegisterButtonProps) => {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen("close-cash-register")
  }

  return (
    <Button onClick={handleClick}>
      Cerrar Caja
    </Button>
  )
}
export default CloseCashRegisterButton