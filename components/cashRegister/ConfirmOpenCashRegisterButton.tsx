"use client"
import { useDialogStore } from "@/stores/generalDialog"
import { Check, Loader, Trash2, X } from "lucide-react"
import { toast } from "../ui/use-toast"
import { Button } from "../ui/button"
import { useState } from "react"
import { openCashRegister } from "@/actions/openCashRegister"


type ConfirmOpenCashRegisterButtonProps = {
  cashRegisters: any
  userId: string
}

function ConfirmOpenCashRegisterButton({ cashRegisters, userId }: ConfirmOpenCashRegisterButtonProps) {

  const { setClose } = useDialogStore((state: any) => state)
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = () => {
    setLoading(true)
    openCashRegister(cashRegisters.id, 0, userId)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Caja abierta correctamente",
          description: "La caja se ha abierto correctamente, puedes verla en la sección de cajas"
        })
        setClose()
      })
      .catch((error) => {
        if (error instanceof Error) {
          return toast({
            variant: "destructive",
            title: "Error al abrir la caja",
            description: error.message
          })
        }
        return toast({
          variant: "destructive",
          title: "Error al abrir la caja",
          description: error.message
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Button onClick={handleClick} className="flex gap-2 text-white dark:text-primary-foreground">
      {loading ? <Loader className="animate-spin" /> : <Check />}
      Confirmar
    </Button>
  )
}
export default ConfirmOpenCashRegisterButton