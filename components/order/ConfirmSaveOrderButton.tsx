"use client"
import { useOrderStore } from "@/stores/orderStore"
import { Button } from "../ui/button"
import { saveNewOrder } from "@/actions/saveNewOrder"
import { useState } from "react"
import { Check, Loader } from "lucide-react"
import { toast } from "../ui/use-toast"
import { useDialogStore } from "@/stores/generalDialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type Props = {
  cashRegisters: any
  userId: string
}
function ConfirmSaveOrderButton({ cashRegisters, userId }: Props) {

  const { products, total, cancelOrder , customer , setClient } = useOrderStore((state: any) => state)
  const [loading, setLoading] = useState<boolean>(false)
  const { setClose } = useDialogStore((state: any) => state)
  const [paymentMethod, setPaymentMethod] = useState<string>("cash")

  const handleClick = () => {
    setLoading(true)
    saveNewOrder(userId, products, cashRegisters, total, customer.id, paymentMethod)
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
        setClient({})
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

  const handleChange = (value: string) => {
    setPaymentMethod(value)
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="text-muted-foreground">Seleccione el método de pago para la orden, luego podra confirmar la orden</p>
      <Select defaultValue="cash" onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona un metodo de pago" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cash">Efectivo</SelectItem>
          <SelectItem value="debt">Fiado/Deuda</SelectItem>
          <SelectItem value="credit">Tarjeta de crédito</SelectItem>
          <SelectItem value="debit">Tarjeta de débito</SelectItem>
          <SelectItem value="transfer">Transferencia bancaria</SelectItem>
          <SelectItem value="mercadopago">Mercado Pago</SelectItem>
          <SelectItem value="other">Otro</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleClick} className="flex items-center gap-2 text-white dark:text-primary-foreground">
        {loading ? <Loader className="animate-spin" /> : <Check />}
        Confirmar Orden
      </Button>
    </div>
  )
}
export default ConfirmSaveOrderButton