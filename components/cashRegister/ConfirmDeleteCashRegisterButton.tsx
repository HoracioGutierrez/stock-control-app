"use client"
import { Check, Loader } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { deleteCashRegister } from "@/actions/deleteCashRegister"
import { toast } from "../ui/use-toast"
import { useDialogStore } from "@/stores/generalDialog"


type ConfirmDeleteCashRegisterButtonProps = {
  cashRegisters: any
  userId: string
}

function ConfirmDeleteCashRegisterButton({ cashRegisters, userId }: ConfirmDeleteCashRegisterButtonProps) {

  const [loading, setLoading] = useState<boolean>(false)
  const { setClose } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setLoading(true)
    deleteCashRegister(cashRegisters.id, userId)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }

        toast({
          title: "Caja eliminada correctamente",
          description: "La caja se ha eliminado correctamente. Puedes verla en la sección de cajas usando el filtro de cajas eliminadas."
        })
      })
      .catch((error) => {
        if (error instanceof Error) {
          return toast({
            variant: "destructive",
            title: "Error al eliminar la caja",
            description: error.message
          })
        }

        toast({
          variant: "destructive",
          title: "Error al eliminar la caja",
          description: "Error al eliminar la caja",
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
export default ConfirmDeleteCashRegisterButton