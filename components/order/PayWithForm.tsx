"use client"

import { useOrderStore } from "@/stores/orderStore"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"


const schema = yup.object().shape({
  amount: yup.string().required("El monto a pagar es obligatorio")
})

function PayWithForm() {

  const { total } = useOrderStore((state: any) => state)
  const [amount, setAmount] = useState<number>(0)
  const { handleSubmit, register, formState: { errors }, setError } = useForm<any>({
    defaultValues: {
      amount: 0
    },
    resolver: yupResolver(schema)
  })

  const handleCalculate = (data: any) => {
    if (data.amount < total) {
      return setError("amount", { message: "El monto a pagar debe ser mayor a la total", type: "min" })
    }

    setAmount(data.amount - total)
  }

  return (
    <Card className="bg-transparent border-none">
      <form onSubmit={handleSubmit(handleCalculate)}>
        <CardHeader className="p-0 pb-8">
          <CardDescription className="text-muted-foreground">Ingrese el monto con el cual desea pagar</CardDescription>
        </CardHeader>
        <CardContent className="gap-4 grid p-0">
          <CardDescription>Monto a pagar : ${total}</CardDescription>
          {amount && <CardDescription>Vuelto : ${amount}</CardDescription>} 
          <div className="flex flex-col gap-4">
            <Label htmlFor="barcode">Paga con</Label>
            {errors.amount && <p className="text-red-500">{errors.amount.message as string}</p>}
            <Input placeholder="1000" id="barcode" {...register("amount")} />
          </div>
          <Button className="flex items-center gap-2 text-white dark:text-primary-foreground">
            <span>Calcular Cambio</span>
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}
export default PayWithForm