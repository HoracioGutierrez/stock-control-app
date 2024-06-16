"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { cashRegisterSchema } from "@/lib/schemas"
import { CashRegisterInputValues } from "@/lib/types"
import { useDialogStore } from "@/stores/generalDialog"
import { toast } from "./ui/use-toast"
import { createNewCashRegister } from "@/actions/createNewCashRegister"
import { Button } from "./ui/button"
import { Loader, Plus, PlusIcon } from "lucide-react"

type NewCashRegisterFormProps = {
  userId: string
}

function NewCashRegisterForm({ userId }: NewCashRegisterFormProps) {

  const [error, setError] = useState<string | null>(null)
  const { setClose } = useDialogStore((state: any) => state)
  const [loading, setLoading] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CashRegisterInputValues>({
    defaultValues: {
      label: "",
      currentAmount: 0,
      totalAmount: 0
    },
    resolver: yupResolver(cashRegisterSchema)
  })

  const onSubmit: SubmitHandler<CashRegisterInputValues> = (data: CashRegisterInputValues) => {
    setLoading(true)
    createNewCashRegister({
      label: data.label,
      currentAmount: data.currentAmount,
      totalAmount: data.totalAmount,
    }, userId)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Caja creada correctamente",
          description: "La caja se ha creado correctamente, puedes verla en la sección de cajas"
        })
        reset()
      })
      .catch((error) => {
        if (error instanceof Error) {
          return setError(error.message)
        }
        setError("Error al crear la caja, intente nuevamente o contacte al desarrollador.")
        toast({
          variant: "destructive",
          title: "Error al crear la caja",
          description: error.message
        })
      })
      .finally(() => {
        setClose(false)
        setLoading(false)
      })
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="self-stretch">
        <Card className="bg-accent h-full">
          <CardHeader>
            <CardTitle>Detalles</CardTitle>
            <CardDescription>Estos detalles son obligatorios para que la caja pueda crearse correctamente.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="label">Label</Label>
              <Input type="text" placeholder="Label" {...register("label")} />
              {errors.label && <p className="text-red-500">{errors.label.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currentAmount">Monto Actual</Label>
              <Input type="text" placeholder="Monto Actual" {...register("currentAmount")} />
              {errors.currentAmount && <p className="text-red-500">{errors.currentAmount.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalAmount">Monto Total</Label>
              <Input type="text" placeholder="Monto Total" {...register("totalAmount")} />
              {errors.totalAmount && <p className="text-red-500">{errors.totalAmount.message}</p>}
            </div>
          </CardContent>
        </Card>
      </div>
      <Button className="flex items-center gap-2 mx-auto mt-8 text-white dark:text-primary-foreground" disabled={loading}>
        {loading ? <Loader className="animate-spin" /> : <PlusIcon />}
        <span>Guardar caja</span>
      </Button>
    </form>
  )
}
export default NewCashRegisterForm