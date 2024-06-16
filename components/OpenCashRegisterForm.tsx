"use client"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "./ui/select"
import { Button } from "./ui/button"
import { useDialogStore } from "@/stores/generalDialog"
import { openCashRegister } from "@/actions/openCashRegister"
import { toast } from "./ui/use-toast"
import { Loader, ShoppingBasket } from "lucide-react"

type OpenCashRegisterFormProps = {
  userId: string
  data: any[]
}

function OpenCashRegisterForm({ userId, data }: OpenCashRegisterFormProps) {

  const [cashRegisterId, setCashRegisterId] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const { setClose } = useDialogStore((state: any) => state)

  const handleChange = (value: string) => {
    setCashRegisterId(value)
  }

  const handleSubmit = () => {
    setLoading(true)
    openCashRegister(cashRegisterId, userId)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Caja abierta correctamente",
          description: "La caja se ha abierto correctamente, puedes verla en la sección de cajas"
        })
        setLoading(false)
        setClose()
      })
      .catch((error) => {
        if (error instanceof Error) {
          return setLoading(false)
        }
        toast({
          variant: "destructive",
          title: "Error al abrir la caja",
          description: error.message
        })
        setLoading(false)
        setClose()
      })
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6">Selecciona la caja que deseas abrir</p>
      <div className="flex flex-col gap-4">
        <Select onValueChange={handleChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una caja" />
          </SelectTrigger>
          <SelectContent>
            {data.map((cashRegister: any) => (
              <SelectItem key={cashRegister.id} value={cashRegister.id}>
                {cashRegister.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="w-full flex gap-2 text-white dark:text-primary-foreground" disabled={cashRegisterId === ""} onClick={handleSubmit}>
          {loading ? <Loader className="animate-spin" /> : <ShoppingBasket />}
          Abrir Caja
        </Button>
      </div>
    </div>
  )
}

export default OpenCashRegisterForm