"use client"

import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { getProductByBarcode } from "@/actions/getProductByBarcode"
import { useOrderStore } from "@/stores/orderStore"
import { useState } from "react"
import { toast } from "../ui/use-toast"
import { Check, Loader, Search } from "lucide-react"

const schema = yup.object().shape({
  barcode: yup.string().required("El codigo de barras es obligatorio")
})

function ManualScan() {

  const { setClose } = useDialogStore((state: any) => state)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { setScannedProduct, setProduct } = useOrderStore((state: any) => state)
  const { handleSubmit, register, formState: { errors } } = useForm<any>({
    defaultValues: {
      barcode: ""
    },
    resolver: yupResolver(schema)
  })

  const handleManualScan = (data: any) => {
    setLoading(true)
    getProductByBarcode(data.barcode)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        setProduct(data.data)
        setScannedProduct(data.data)
        setClose()
      })
      .catch((error) => {
        if (error instanceof Error) {
          if (error.message === "Producto no encontrado") {
            toast({
              variant: "destructive",
              title: "Producto no encontrado",
              description: "El producto no existe en nuestro inventario"
            })
            return setError("El producto no existe en nuestro inventario")
          }

          toast({
            variant: "destructive",
            title: "Error al obtener el producto",
            description: error.message
          })
          return setError(error.message)
        }

        toast({
          variant: "destructive",
          title: "Error al obtener el producto",
          description: "Ha ocurrido un error al obtener el producto, intente nuevamente o contacte al desarrollador."
        })
        return setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Card className="bg-transparent border-none">
      <form onSubmit={handleSubmit(handleManualScan)}>
        <CardHeader className="p-0 pb-8">
          <CardDescription className="text-muted-foreground">Increse el Codigo de barras de un producto manualmente con el teclado</CardDescription>
        </CardHeader>
        <CardContent className="gap-4 grid p-0">
          <div className="flex flex-col gap-4">
            <Label htmlFor="barcode">Codigo de barras</Label>
            {errors.barcode && <p className="text-red-500">{errors.barcode.message as string}</p>}
            <Input placeholder="Ej.: 111222333" id="barcode" {...register("barcode")} />
          </div>
          <Button disabled={loading} className="flex items-center gap-2 text-white dark:text-primary-foreground">
            {loading ? <Loader className="animate-spin" /> : <Search />}
            <span>Buscar Producto</span>
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}
export default ManualScan