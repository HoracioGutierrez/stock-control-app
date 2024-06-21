"use client"
import { useOrderStore } from "@/stores/orderStore"
import { Button } from "../ui/button"
import { saveNewOrder } from "@/actions/saveNewOrder"
import { useState } from "react"
import { Check, Loader } from "lucide-react"
import { toast } from "../ui/use-toast"
import { useDialogStore } from "@/stores/generalDialog"

type Props = {
  cashRegisters: any
  userId: string
}
function ConfirmSaveOrderButton({ cashRegisters, userId }: Props) {

  const { products, total, cancelOrder , clientId } = useOrderStore((state: any) => state)
  const [loading, setLoading] = useState<boolean>(false)
  const { setClose } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setLoading(true)
    saveNewOrder(userId, products, cashRegisters, total, clientId)
      .then((data) => {
        if (!data) {
          throw new Error("Error al guardar la orden")
        }

        toast({
          title: "Orden guardada correctamente",
          description: "La orden se ha guardado correctamente, puedes verla en la sección de ordenes"
        })
        setClose()
        cancelOrder()
      })
      .catch((error) => {
        if (error instanceof Error) {
          return toast({
            variant: "destructive",
            title: "Error al guardar la orden",
            description: error.message
          })
        }
        return toast({
          variant: "destructive",
          title: "Error al guardar la orden",
          description: error.message
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="text-muted-foreground">Esta seguro que desea guardar la orden?</p>
      <Button onClick={handleClick} className="flex items-center gap-2 text-white dark:text-primary-foreground">
        {loading ? <Loader className="animate-spin" /> : <Check />}
        Confirmar Orden
      </Button>
    </div>
  )
}
export default ConfirmSaveOrderButton