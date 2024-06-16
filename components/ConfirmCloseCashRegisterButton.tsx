"use client"
import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "./ui/button"
import { closeCashRegister } from "@/actions/closeCashRegister"
import { useState } from "react"
import { Loader } from "lucide-react"
import { toast } from "./ui/use-toast"

type ConfirmCloseCashRegisterButtonProps = {
  cashRegisters: any
  userId: string
}

const ConfirmCloseCashRegisterButton = ({ cashRegisters, userId }: ConfirmCloseCashRegisterButtonProps) => {

  const { setClose } = useDialogStore((state: any) => state)
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = () => {
    setLoading(true)
    closeCashRegister(cashRegisters[0].id, userId)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Caja cerrada correctamente",
          description: "La caja se ha cerrado correctamente, puedes verla en la sección de cajas"
        })
        setLoading(false)
        setClose()
      })
      .catch((error) => {
        if (error instanceof Error) {
          toast({
            variant: "destructive",
            title: "Error al cerrar la caja",
            description: error.message
          })
          return setLoading(false)
        }
        toast({
          variant: "destructive",
          title: "Error al cerrar la caja",
          description: error.message
        })
        setLoading(false)
        setClose()
      })
  }

  return (
    <Button onClick={handleClick}>
      {loading && <Loader className="animate-spin" />}
      Confirmar
    </Button>
  )
}
export default ConfirmCloseCashRegisterButton