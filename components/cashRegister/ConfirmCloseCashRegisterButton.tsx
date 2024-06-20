"use client"
import { useDialogStore } from "@/stores/generalDialog"
import { Check, Loader, Trash2, X } from "lucide-react"
import { toast } from "../ui/use-toast"
import { Button } from "../ui/button"
import { useState } from "react"
import { closeCashRegister } from "@/actions/closeCashRegister"

type ConfirmCloseCashRegisterButtonProps = {
  cashRegisters: any
  userId: string
}

const ConfirmCloseCashRegisterButton = ({ cashRegisters, userId }: ConfirmCloseCashRegisterButtonProps) => {

  const { setClose } = useDialogStore((state: any) => state)
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = () => {
    setLoading(true)
    closeCashRegister(cashRegisters.id, userId)
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
    <Button onClick={handleClick} className="flex gap-2 text-white dark:text-primary-foreground">
      {loading ? <Loader className="animate-spin" /> : <Check />}
      Confirmar
    </Button>
  )
}
export default ConfirmCloseCashRegisterButton