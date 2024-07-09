"use client"
import { Check, Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { reactivateCashRegister } from "@/actions/reactivateCashRegister"
import { toast } from "../ui/use-toast"
import { useDialogStore } from "@/stores/generalDialog"

type ConfirmReactivateCashRegisterButtonProps = {
  cashRegisters: any
  userId: string
}

function ConfirmReactivateCashRegisterButton({ cashRegisters, userId }: ConfirmReactivateCashRegisterButtonProps) {

  const [loading, setLoading] = useState<boolean>(false)
  const { setClose } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setLoading(true)
    reactivateCashRegister(cashRegisters.id, userId)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Caja reactivada correctamente",
          description: "La caja se ha reactivado correctamente, puedes verla en la sección de cajas"
        })
      })
      .catch((error) => {
        if (error instanceof Error) {
          return toast({
            variant: "destructive",
            title: "Error al reactivar la caja",
            description: error.message
          })
        }
        return toast({
          variant: "destructive",
          title: "Error al reactivar la caja",
          description: "Error al reactivar la caja, intente nuevamente o contacte al desarrollador."
        })
      })
      .finally(() => {
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
export default ConfirmReactivateCashRegisterButton