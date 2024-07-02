"use client"

import { customerDebtSchema } from "@/lib/schemas"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState } from "react"
import { Button } from "../ui/button"
import { editById } from "@/actions/editById"
import { useDialogStore } from "@/stores/generalDialog"
import { payCustomerDebt } from "@/actions/payCustomerDebt"
import { toast } from "../ui/use-toast"
import { Check, Loader } from "lucide-react"

type Props = {
  type: string
  userId: string
}

function UpdateCustomerDebtForm({ type, userId }: Props) {

  const [isChecked, setIsChecked] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { id, setClose } = useDialogStore((state: any) => state)
  const { register, handleSubmit, formState: { errors }, getValues, setValue, clearErrors, reset } = useForm<any>({
    defaultValues: {
      payAll: true,
      manualAmount: 0
    },
    resolver: yupResolver(customerDebtSchema),
  })

  const onSubmit = (data: any) => {

    setLoading(true)
    payCustomerDebt(id, getValues("payAll"), getValues("manualAmount"), userId)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Debe haber sido pagado correctamente",
          description: "El cliente se ha pagado correctamente de la base de datos",
        })
        reset()
        setClose()
      })
      .catch((error) => {
        if (error instanceof Error) {
          toast({
            variant: "destructive",
            title: "Error al pagar la deuda",
            description: error.message
          })
          return setError(error.message)
        }
        setError("Error al pagar la deuda, intente nuevamente o contacte al desarrollador.")
        toast({
          variant: "destructive",
          title: "Error al pagar la deuda",
          description: "Error al pagar la deuda, intente nuevamente o contacte al desarrollador."
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleChecked = (e: any) => {
    clearErrors("manualAmount")
    setIsChecked(!isChecked)
    setValue("payAll", !isChecked)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-8 grid">
        <div className="gap-2 grid">
          <Label htmlFor="payAll">Pagar todo</Label>
          <Checkbox {...register("payAll")} onCheckedChange={handleChecked} checked={isChecked} />
        </div>
        <div className="gap-2 grid">
          <Label htmlFor="manualAmount">Monto manual</Label>
          {errors.manualAmount && <p className="text-red-500">{errors.manualAmount.message as string}</p>}
          <Input type="number" {...register("manualAmount")} disabled={isChecked} />
        </div>
        <Button className="group">
          {loading ? <Loader className="animate-spin" /> : <Check className="group-hover:text-green-500 text-muted-foreground aspect-square" />}
          <span className="text-muted-foreground">Pagar</span>
        </Button>
      </div>
    </form>
  )
}
export default UpdateCustomerDebtForm