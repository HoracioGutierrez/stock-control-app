"use client"
import { deleteById } from "@/actions/deleteById"
import { Button } from "./ui/button"
import { reactivateById } from "@/actions/reactivateById"
import { toast } from "./ui/use-toast"
import { useState } from "react"
import { Check, Loader } from "lucide-react"
import { DeleteProductConfirmationFormProps, ReactivateByIdProps } from "@/lib/types"
import { useDialogStore } from "@/stores/generalDialog"


function DeleteProductConfirmationForm({ barcode, type, userId }: DeleteProductConfirmationFormProps) {

  const [loading, setLoading] = useState<boolean>(false)
  const { setClose } = useDialogStore((state: any) => state)
  const entityType = "product"

  const handleClick = () => {
    setLoading(true)
    let request: any
    if (type === "delete-product") {
      request = deleteById({ entityType, entityId: barcode, userId })
        .then((data) => {
          if (data?.error) {
            throw new Error(data.error)
          }
          toast({
            title: "Producto eliminado correctamente",
            description: "El producto se ha eliminado correctamente de la base de datos",
          })
        })
        .catch((error) => {
          if (error instanceof Error) {
            return toast({
              variant: "destructive",
              title: "Error al eliminar el producto",
              description: error.message
            })
          }
          return toast({
            variant: "destructive",
            title: "Error al eliminar el producto",
            description: "Error al eliminar el producto",
          })
        })
    } else {
      request = reactivateById({ entityType, entityId: barcode, userId } as ReactivateByIdProps)
        .then((data) => {
          if (data?.error) {
            throw new Error(data.error)
          }
          toast({
            title: "Producto reactivado correctamente",
            description: "El producto se ha reactivado correctamente de la base de datos",
          })
        })
        .catch((error) => {
          if (error instanceof Error) {
            return toast({
              variant: "destructive",
              title: "Error al reactivar el producto",
              description: error.message
            })
          }
          return toast({
            variant: "destructive",
            title: "Error al reactivar el producto",
            description: "Error al reactivar el producto",
          })
        })
    }
    request.finally(() => {
      setLoading(false)
      setClose()
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-muted-foreground">
        <p>Esto {type === "delete-product" ? "eliminará" : "activará"} el producto en su inventario.</p>
        <p>¿Está seguro de que desea continuar?</p>
      </div>
      <Button className="self-center" onClick={handleClick} disabled={loading}>
        {loading ? <Loader className="animate-spin" /> : <Check />}
        Confirmar
      </Button>
    </div>
  )
}
export default DeleteProductConfirmationForm