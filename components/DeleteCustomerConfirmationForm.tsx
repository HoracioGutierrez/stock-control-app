"use client"

import { deleteById } from "@/actions/deleteById"
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"
import { useState } from "react"
import { Check, Loader } from "lucide-react"
import { reactivateCustomerById } from "@/actions/reactivateCustomerById"
import { useDialogStore } from "@/stores/generalDialog"
import { DeleteCustomerProps } from "@/lib/types"

function DeleteCustomerConfirmationForm({ entityType, entityId, type, userId, hasVariants }: DeleteCustomerProps) {

    const [loading, setLoading] = useState(false)

    const { setClose } = useDialogStore((state: any) => state)

    const handleClick = () => {
        setLoading(true)
        let request: any
        request = deleteById({ entityType, entityId, userId })
        if (type === "delete-customer") {
            request = deleteById({ entityType, entityId, userId })
                .then((data) => {
                    if (data?.error) {
                        throw new Error(data.error)
                    }
                    toast({
                        title: "Cliente bloqueado correctamente",
                        description: "El cliente se ha bloqueado correctamente en la base de datos",
                    })
                })
                .catch((error) => {
                    if (error instanceof Error) {
                        return toast({
                            variant: "destructive",
                            title: "Error al bloquear el cliente",
                            description: error.message
                        })
                    }
                    return toast({
                        variant: "destructive",
                        title: "Error al bloquear el cliente",
                        description: "Error al bloquear el cliente",
                    })
                })
        } else {
            request = reactivateCustomerById(entityId)
                .then((data) => {
                    if (data?.error) {
                        throw new Error(data.error)
                    }
                    toast({
                        title: "Cliente habilitado correctamente",
                        description: "El cliente se ha habilitado correctamente de la base de datos",
                    })
                })
                .catch((error) => {
                    if (error instanceof Error) {
                        return toast({
                            variant: "destructive",
                            title: "Error al habilitar el cliente",
                            description: error.message
                        })
                    }
                    return toast({
                        variant: "destructive",
                        title: "Error al habilitar el cliente",
                        description: "Error al habilitar el cliente",
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
                <p>Esto {type === "delete-customer" ? "bloqueará" : "habilitará"} el cliente.</p>
                <p>¿Está seguro de que desea continuar?</p>
            </div>
            <Button className="self-center" onClick={handleClick} disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : <Check />}
                Confirmar
            </Button>
        </div>
    )
}

export default DeleteCustomerConfirmationForm
