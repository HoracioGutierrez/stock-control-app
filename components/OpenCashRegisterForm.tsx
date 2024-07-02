"use client"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "./ui/select"
import { Button } from "./ui/button"
import { useDialogStore } from "@/stores/generalDialog"
import { openCashRegister } from "@/actions/openCashRegister"
import { toast } from "./ui/use-toast"
import { Loader, ShoppingBasket } from "lucide-react"
import { CashRegisterInputValues } from "@/lib/types"
import { cashRegisterSchema } from "@/lib/schemas"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

type OpenCashRegisterFormProps = {
  userId: string
  data: any[]
}

function OpenCashRegisterForm({ userId, data }: OpenCashRegisterFormProps) {

  const [cashRegisterId, setCashRegisterId] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const { setClose } = useDialogStore((state: any) => state)
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<CashRegisterInputValues>({
    defaultValues: {
      label: "",
      /* currentAmount: 0,
      totalAmount: 0 */
    },
    resolver: yupResolver(cashRegisterSchema)
  })

  const handleChange = (value: string) => {
    setValue("label", value)
  }

  const onSubmit = (data: CashRegisterInputValues) => {
    setLoading(true)
    openCashRegister(data.label, 0, userId)
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
          toast({
            variant: "destructive",
            title: "Error al abrir la caja",
            description: error.message
          })
          return setLoading(false)
        }
        toast({
          variant: "destructive",
          title: "Error al abrir la caja",
          description: "Ha ocurrido un error al abrir la caja, intente nuevamente o contacte al desarrollador."
        })
        setLoading(false)
        setClose()
      })
  }

  return (
    <div>
      <p className="mb-6 text-muted-foreground text-sm">Selecciona la caja que deseas abrir</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Label htmlFor="label">Label</Label>
          <Select onValueChange={handleChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una caja" />
            </SelectTrigger>
            <SelectContent>
              {data.map((cashRegister: any) => (
                <SelectItem key={cashRegister.id} value={cashRegister.id} disabled={cashRegister.openedById}>
                  {cashRegister.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="flex flex-col gap-4">
          <Label htmlFor="currentAmount">Monto de apertura</Label>
          <Input type="text" placeholder="Monto Actual" {...register("currentAmount")} />
          {errors.currentAmount && <p className="text-red-500">{errors.currentAmount.message}</p>}
        </div> */}
        <Button className="flex gap-2 w-full text-white dark:text-primary-foreground">
          {loading ? <Loader className="animate-spin" /> : <ShoppingBasket />}
          Abrir Caja
        </Button>
      </form>
    </div>
  )
}

export default OpenCashRegisterForm