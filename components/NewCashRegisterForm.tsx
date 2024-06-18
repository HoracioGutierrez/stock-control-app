"use client"
import { useEffect, useState } from "react"
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
import { Check, Loader, Plus, PlusIcon } from "lucide-react"
import { getAllCashRegisters } from "@/actions/getAllCashRegisters"
import PouchDb from "pouchdb-browser"

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

  const saveCashRegister = async (data: any) => {
    setLoading(true)
    try {
      const response = await fetch("/api/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: data, userId: userId })
      })
      const body = await response.json()
      if (body.error) {
        throw new Error("refetch")
      }
      toast({
        title: "Caja creada correctamente",
        description: "La caja se ha creado correctamente, puedes verla en la sección de cajas"
      })
      reset()
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "refetch") {
          const db = new PouchDb('cashRegisters');
          const response = await db.allDocs({ include_docs: true });
          const data = response.rows.map((row) => row.doc)
        }
      }
      setError("Error al crear la caja, intente nuevamente o contacte al desarrollador.")
      toast({
        variant: "destructive",
        title: "Error al crear la caja",
        description: "Error al crear la caja"
      })
    }
    setLoading(false)
  }


  const onSubmit: SubmitHandler<CashRegisterInputValues> = (data: CashRegisterInputValues) => {
    setLoading(true)
    saveCashRegister(data)
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
        {loading ? <Loader className="animate-spin" /> : <Check />}
        <span>Guardar caja</span>
      </Button>
    </form>
  )
}
export default NewCashRegisterForm