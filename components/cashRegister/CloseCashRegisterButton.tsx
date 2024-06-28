"use client"
import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import CustomButton from "../layout/CustomButton"

type CloseCashRegisterButtonProps = {
}

const CloseCashRegisterButton = ({ }: CloseCashRegisterButtonProps) => {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen("close-cash-register")
  }

  return (
    <CustomButton onClick={handleClick} icon={<X/>} tooltip="Cerrar la caja actual y dejar de poder realizar nuevas compras">
      Cerrar Caja
    </CustomButton>
  )
}
export default CloseCashRegisterButton