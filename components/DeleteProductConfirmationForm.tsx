"use client"
import { deleteProduct } from "@/actions/deleteProduct"
import { Button } from "./ui/button"
import { reactivateProduct } from "@/actions/reactivateProduct"
import { toast } from "./ui/use-toast"
import { useState } from "react"
import { Loader } from "lucide-react"
import { useProductDialogStore } from "@/stores/productDialogStore"

type DeleteProductConfirmationFormProps = {
  barcode: string
  type: string
}

function DeleteProductConfirmationForm({ barcode, type }: DeleteProductConfirmationFormProps) {

  const [loading, setLoading] = useState<boolean>(false)
  const { close } = useProductDialogStore((state: any) => state)

  const handleClick = () => {
    setLoading(true)
    let request: any
    if (type === "delete") {
      request = deleteProduct(barcode)
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
      request = reactivateProduct(barcode)
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
      close()
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p>Esto {type === "delete" ? "eliminará" : "activará"} el producto en su inventario.</p>
        <p>¿Está seguro de que desea continuar?</p>
      </div>
      <Button className="self-center" onClick={handleClick} disabled={loading}>
        {loading && <Loader className="animate-spin" />}
        Confirmar
      </Button>
    </div>
  )
}
export default DeleteProductConfirmationForm