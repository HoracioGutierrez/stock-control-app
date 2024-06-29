"use client"

import { deleteById } from "@/actions/deleteById"
import { DeleteByIdProps, DeleteCustomerProps, GeneralResponse, ReactivateByIdProps } from "@/lib/types"
import { useDialogStore } from "@/stores/generalDialog"
import { useState } from "react"
import { toast } from "../ui/use-toast"
import { reactivateById } from "@/actions/reactivateById"
import { Button } from "../ui/button"
import { Check, Loader, X } from "lucide-react"
import { IconDeviceFloppy } from "@tabler/icons-react"

function DeleteProviderConfirmationForm({ entityType,
  entityId, type, userId, hasVariants }: DeleteCustomerProps) {

  const [loading, setLoading] = useState(false)

  const { setClose } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setLoading(true)

    let request
    if (type === "delete-provider") {
      request = deleteById({
        entityType,
        entityId,
        userId
      } as DeleteByIdProps)
        .then((data) => {
          if (data?.error) {
            throw new Error(data.error)
          }
          toast({
            title: "Proveedor eliminado correctamente.",
            description: "El proveedor se ha eliminado correctamente de la base de datos.",
          })
        })
        .catch((error) => {
          if (error instanceof Error) {
            return toast({
              variant: "destructive",
              title: "Error al eliminar el proveedor.",
              description: error.message
            })
          }
          return toast({
            variant: "destructive",
            title: "Error al eliminar el proveedor.",
            description: "No se pudo eliminar el proveedor."
          })
        })
    } else {
      request = reactivateById({
        entityType,
        entityId,
        userId
      } as ReactivateByIdProps)
        .then((data) => {
          if (data?.error) {
            throw new Error(data.error)
          }
          toast({
            title: "Proveedor reactivado correctamente.",
            description: "El proveedor se ha reactivado correctamente de la base de datos.",
          })
        })
        .catch((error) => {
          if (error instanceof Error) {
            return toast({
              variant: "destructive",
              title: "Error al reactivar el proveedor.",
              description: error.message
            })
          }
          return toast({
            variant: "destructive",
            title: "Error al reactivar el proveedor.",
            description: "No se pudo reactivar el proveedor."
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
        <p>Esto {type === "delete-provider" ?
          "eliminará" : "habilitará"} el proveedor.
        </p>
        <p>¿Está seguro de que desea continuar?</p>
      </div>
      <Button className="self-center group" onClick={handleClick} disabled={loading}>
        {loading ? <Loader
          className="animated-spin" /> : type === "delete-provider" ? <Check className="p-0 size-6 text-muted-foreground group-hover:text-green-500 aspect-square" /> : <X className="p-0 size-6 text-muted-foreground group-hover:text-green-500 aspect-square" />}
        <span className="text-muted-foreground">{type === "delete-provider" ? "Si, Eliminar." : "Si, Reactivar."}</span>
      </Button>
    </div>
  )
}

export default DeleteProviderConfirmationForm