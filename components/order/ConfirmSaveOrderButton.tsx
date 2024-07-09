"use client"
import { useOrderStore } from "@/stores/orderStore"
import { Button } from "../ui/button"
import { saveNewOrder } from "@/actions/saveNewOrder"
import { useState } from "react"
import { Check, HandCoins, Loader } from "lucide-react"
import { toast } from "../ui/use-toast"
import { useDialogStore } from "@/stores/generalDialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { IconBrandVisa, IconCash, IconCashOff, IconCreditCard, IconCreditCardFilled, IconDeviceMobileCog, IconDeviceMobileDollar, IconQuestionMark, IconTransferIn } from "@tabler/icons-react"

type Props = {
  cashRegisters: any
  userId: string
}
function ConfirmSaveOrderButton({ cashRegisters, userId }: Props) {

  const { products, total, cancelOrder, customer, setClient } = useOrderStore((state: any) => state)
  const [loading, setLoading] = useState<boolean>(false)
  const { setClose } = useDialogStore((state: any) => state)
  const [paymentMethod, setPaymentMethod] = useState<string>("cash")
  const [error, setError] = useState<string | null>(null)

  const handleClick = () => {
    if(paymentMethod === "debt" && !customer.id) {
      return setError("Si el tipo de pago es fiado/deuda, debes seleccionar un cliente")
    }
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
          description: "Error al guardar la orden, intente nuevamente o contacte al desarrollador."
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleChange = (value: string) => {
    setPaymentMethod(value)
    if(value === "debt" && !customer.id) {
      return setError("Si el tipo de pago es fiado/deuda, debes seleccionar un cliente")
    }
    setError(null)
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="text-muted-foreground">Seleccione el método de pago para la orden, luego podra confirmar la orden</p>
      {error && <p className="text-red-500">{error}</p>}
      <Select defaultValue="cash" onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona un metodo de pago" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cash" >
            <div className="flex items-center gap-2">
              <IconCash />
              <span>
                Efectivo
              </span>
            </div>
          </SelectItem>
          <SelectItem value="debt">
            <div className="flex items-center gap-2">
              <IconCashOff />
              <span>
                Fiado/Deuda
              </span>
            </div>
          </SelectItem>
          <SelectItem value="credit">
            <div className="flex items-center gap-2">
              <IconBrandVisa />
              <span>
                Tarjeta de crédito
              </span>
            </div>
          </SelectItem>
          <SelectItem value="debit">
            <div className="flex items-center gap-2">
              <IconCreditCardFilled />
              <span>
                Tarjeta de débito
              </span>
            </div>
          </SelectItem>
          <SelectItem value="transfer">
            <div className="flex items-center gap-2">
              <IconTransferIn />
              <span>
                Transferencia bancaria
              </span>
            </div>
          </SelectItem>
          <SelectItem value="mercadopago">
            <div className="flex items-center gap-2">
              <IconDeviceMobileDollar />
              <span>
                Mercado Pago
              </span>
            </div>
          </SelectItem>
          <SelectItem value="other">
            <div className="flex items-center gap-2">
              <IconQuestionMark />
              <span>
                Otro
              </span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleClick} className="flex items-center gap-2 text-white dark:text-primary-foreground" disabled={
        loading || paymentMethod === "debt" && !customer.id
      }>
        {loading ? <Loader className="animate-spin" /> : <Check />}
        Confirmar Orden
      </Button>
    </div>
  )
}
export default ConfirmSaveOrderButton