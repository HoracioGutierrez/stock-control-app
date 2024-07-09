"use client"
import { useState } from "react"
import CustomButton from "../layout/CustomButton"
import { cancelOrder } from "@/actions/cancelOrder"
import { toast } from "../ui/use-toast"
import { useDialogStore } from "@/stores/generalDialog"

type Props = {
  userId: string
  orderId: string
}

function CancelOrderForm({ userId, orderId }: Props) {

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { setClose } = useDialogStore((state: any) => state)


  const handleClick = () => {
    setLoading(true)
    cancelOrder(orderId, userId)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Orden cancelada correctamente",
          description: "La orden se ha cancelado correctamente, puedes verla en la sección de ventas"
        })
        setClose()
      })
      .catch((error) => {
        if (error instanceof Error) {
          return toast({
            variant: "destructive",
            title: "Error al cancelar la orden",
            description: error.message
          })
        }
        return toast({
          variant: "destructive",
          title: "Error al cancelar la orden",
          description: "Error al cancelar la orden, intente nuevamente o contacte al desarrollador."
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <p className="text-muted-foreground">Esta acción no se puede deshacer : Los productos volverán a estar disponibles en el stock del inventario y se descontará el monto de la orden del balance actual de la caja.</p>
      <p className="text-muted-foreground">¿Está seguro de que desea continuar?</p>
      <CustomButton onClick={handleClick} isLoading={loading}>
        Confirmar
      </CustomButton>
    </>
  )
}
export default CancelOrderForm