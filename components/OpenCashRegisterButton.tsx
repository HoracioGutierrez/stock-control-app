"use client"
import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "./ui/button"

type OpenCashRegisterButtonProps = {
}

const OpenCashRegisterButton = ({ }: OpenCashRegisterButtonProps) => {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen("open-cash-register")
  }

  return (
    <Button onClick={handleClick}>
      Abrir Caja
    </Button>
  )
}
export default OpenCashRegisterButton