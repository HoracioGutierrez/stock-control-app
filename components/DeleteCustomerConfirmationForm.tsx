"use client"

import { deleteCustomerById } from "@/actions/deleteCustomerById"
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"
import { useState } from "react"
import { Loader } from "lucide-react"
import { reactivateCustomerById } from "@/actions/reactivateCustomerById"
import { useCustomerDialogStore } from "@/stores/useCustomerDialogStore"
import { DeleteCustomerProps } from "@/lib/types"

function DeleteCustomerConfirmationForm({ id, type }: DeleteCustomerProps) {

    const [loading, setLoading] = useState(false)
    
    const { handleClose } = useCustomerDialogStore((state: any) => state)

    const handleClick = () => {
        setLoading(true)
        let request: any
        request = deleteCustomerById(id)
        if (type === "delete") {
            request = deleteCustomerById(id)
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
            request = reactivateCustomerById(id)
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
            handleClose()
        })
    }

    return (
        <div className="flex flex-col gap-8">
            <div>
                <p>Esto {type === "delete" ? "bloqueará" : "habilitará"} el cliente.</p>
                <p>¿Está seguro de que desea continuar?</p>
            </div>
            <Button className="self-center" onClick={handleClick} disabled={loading}>
                {loading && <Loader className="animate-spin" />}
                Confirmar
            </Button>
        </div>
    )
}

export default DeleteCustomerConfirmationForm
