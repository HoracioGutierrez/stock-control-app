import { useForm } from "react-hook-form"
import CustomButton from "./layout/CustomButton"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useState } from "react"
import { saveNewManualOperation } from "@/actions/saveNewManualOperation"
import { toast } from "./ui/use-toast"
import { useDialogStore } from "@/stores/generalDialog"

const schema = yup.object().shape({
  amount: yup.number().moreThan(0, "El monto debe ser mayor a cero").required("El monto es obligatorio").typeError("El monto debe ser un número"),
  reason: yup.string().required("Es obligatorio indicar la razón del ingreso").default("Ingreso Manual"),
  operationType: yup.string().required("Es obligatorio indicar el tipo de operación").default("ingreso"),
})

type Props = {
  userId: string
}

function ManualIncomeForm({ userId }: Props) {

  const [loading, setLoading] = useState<boolean>(false)
  const { setClose } = useDialogStore((state: any) => state)
  const { handleSubmit, register, formState: { errors }, setValue } = useForm<any>({
    defaultValues: {
      amount: 0,
      reason: "Ingreso Manual",
      operationType: "ingreso",
    },
    resolver: yupResolver(schema)
  })

  const handleSaveManualOperation = async (amount: number, reason: string, operationType: string) => {
    setLoading(true)
    const data = await saveNewManualOperation(userId, amount, reason, operationType)
    setLoading(false)
    if (data.error) {
      return toast({
        title: "Error al guardar la operación",
        description: data.error,
        variant: "destructive"
      })
    }
    toast({
      title: "Operación guardada correctamente",
      description: "La operación se ha guardado correctamente, puedes verla en la sección de movimientos",
    })
    setClose()
  }

  const onSubmit = (data: any) => {
    handleSaveManualOperation(data.amount, data.reason, data.operationType)
  }

  const handleChange = (value: string) => {
    setValue("operationType", value)
  }

  return (
    <div>
      <p className="mb-6 text-muted-foreground text-sm">Ingresa o egresa un monto arbitrario de dinero manualmente a la caja actual. Esta acción aumentará o disminuirá el balance actual de la caja y el balance general de la cuenta.</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div>
            <Label htmlFor="amount">Monto a ingresar</Label>
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message as string}</p>}
          </div>
          <Input type="number" placeholder="Monto a ingresar" {...register("amount")} step="any" />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <Label htmlFor="reason">Razón del ingreso</Label>
            {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message as string}</p>}
          </div>
          <Input type="text" placeholder="Razón del ingreso" {...register("reason")} />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <Label htmlFor="operationType">Tipo de operación</Label>
            {errors.operationType && <p className="text-red-500 text-sm">{errors.operationType.message as string}</p>}
          </div>
          <Select onValueChange={handleChange} defaultValue="ingreso">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un tipo de operación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ingreso">
                Ingreso
              </SelectItem>
              <SelectItem value="egreso">
                Retiro
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CustomButton isLoading={loading} type="submit">Confirmar</CustomButton>
      </form>
    </div>
  )
}
export default ManualIncomeForm