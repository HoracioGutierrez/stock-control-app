"use client"

import { deleteById } from "@/actions/deleteById"
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"
import { useState } from "react"
import { Check, Loader, X } from "lucide-react"
import { useDialogStore } from "@/stores/generalDialog"
import { DeleteByIdProps, DeleteCustomerProps, ReactivateByIdProps } from "@/lib/types"
import { reactivateById } from "@/actions/reactivateById"

function DeleteCustomerConfirmationForm({ entityType, entityId, type, userId, hasVariants }: DeleteCustomerProps) {

    const [loading, setLoading] = useState(false)

    const { setClose } = useDialogStore((state: any) => state)

    const handleClick = () => {
        setLoading(true)
        let request: any

        if (type === "delete-customer") {
            request = deleteById({ entityType, entityId, userId } as DeleteByIdProps)
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
                        description: "Error al bloquear el cliente, intente nuevamente o contacte al desarrollador."
                    })
                })
        } else {
            request = reactivateById({ entityType, entityId, userId } as ReactivateByIdProps)
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
                        description: "Error al habilitar el cliente, intente nuevamente o contacte al desarrollador."
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
            <Button className="group self-center" onClick={handleClick} disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : type === "delete-customer" ? <X className="group-hover:text-red-500 text-muted-foreground aspect-square" /> : <Check className="group-hover:text-green-500 text-muted-foreground aspect-square" />}
                {type === "delete-customer" ? <span className="text-muted-foreground">Si, Bloquear.</span> : <span className="text-muted-foreground">Si, Habilitar.</span>}
            </Button>
        </div>
    )
}

export default DeleteCustomerConfirmationForm
