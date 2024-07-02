"use client"

import { deleteById } from "@/actions/deleteById"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"
import { useState } from "react"
import { Check, Loader } from "lucide-react"
import { DeleteByIdProps, DeleteUserProps, GeneralResponse, ReactivateByIdProps } from "@/lib/types"
import { useDialogStore } from "@/stores/generalDialog"
import { reactivateById } from "@/actions/reactivateById"


function DeleteUserConfirmationForm({ userId, type }: DeleteUserProps) {
  const [loading, setLoading] = useState(false)
  const { setClose, id } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setLoading(true)
    if (type === "delete-user") {
      deleteById({ entityType: "user", entityId: id, userId: userId as string })
        .then((data) => {
          if (data?.error) {
            throw new Error(data.error)
          }
          toast({
            title: "Usuario eliminado correctamente",
            description: "El usuario se ha eliminado correctamente de la base de datos",
          })
          setClose()
        })
        .catch((error) => {
          if (error instanceof Error) {
            return toast({
              variant: "destructive",
              title: "Error al eliminar el usuario",
              description: error.message
            })
          }
          return toast({
            variant: "destructive",
            title: "Error al eliminar el usuario",
            description: "Error al eliminar el usuario intente nuevamente o contacte al desarrollador."
          })
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      reactivateById({ entityType: "user", entityId: id, userId: userId as string })
        .then((data) => {
          if (data?.error) {
            throw new Error(data.error)
          }
          toast({
            title: "Usuario reactivado correctamente",
            description: "El usuario se ha reactivado correctamente de la base de datos",
          })
          setClose()
        })
        .catch((error) => {
          if (error instanceof Error) {
            return toast({
              variant: "destructive",
              title: "Error al reactivar el usuario",
              description: error.message
            })
          }
          return toast({
            variant: "destructive",
            title: "Error al reactivar el usuario",
            description: "Error al reactivar el usuario, intente nuevamente o contacte al desarrollador."
          })
        })
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-muted-foreground">
        <p>Esto {type === "delete-user" ? "eliminará" : "activará"} el usuario.</p>
        <p>¿Está seguro de que desea continuar?</p>
      </div>
      <Button className="self-center" onClick={handleClick} disabled={loading}>
        {loading ? <Loader className="animate-spin" /> : <Check />}
        Confirmar
      </Button>
    </div>
  )
}
export default DeleteUserConfirmationForm
