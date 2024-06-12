"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { clientSchema } from "@/lib/schemas"
import { ClientInputValues } from "@/lib/types"
import { useNewProductStore } from "@/stores/newProductStore"
import { createNewClient } from "@/actions/createNewClient"
import { toast } from "./ui/use-toast"

function NewClientForm() {

    const [error, setError] = useState<string | null>(null)
    const { setIsLoading, isLoading } = useNewProductStore((state: any) => ({ isLoading: state.isLoading, setIsLoading: state.setIsLoading }))
    const {  register, handleSubmit, formState: { errors }, reset } = useForm<ClientInputValues>({
        defaultValues: {
            name: "",
            lastName: "",
            phone: "",
            email: "",
            address: "",
            legalName: "",
            cuitCuil: ""
        },
        resolver: yupResolver(clientSchema)
    })

    const onSubmit: SubmitHandler<ClientInputValues> = (data: ClientInputValues) => {
        setIsLoading(true)
        console.log(data)
        createNewClient({
            name: data.name,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            address: data.address,
            legalName: data.legalName,
            cuitCuil: data.cuitCuil,

        }).then((data) => {
            if (data?.error) {
                throw new Error(data.error)
            }
            toast({
                title: "Cliente creado correctamente",
                description: "El cliente se ha creado correctamente, puedes verlo en la sección de clientes"
            })
            reset()
        })
            .catch((error) => {
                if (error instanceof Error) {
                    return setError(error.message)
                }
                setError("Error al crear el cliente, intente nuevamente o contacte al desarrollador.")
                toast({
                    variant: "destructive",
                    title: "Error al crear el cliente",
                    description: error.message
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="new-client-form">
            <div>
                <Card className="bg-accent">
                    <CardHeader>
                        <CardTitle>Detalles Del Cliente</CardTitle>
                        <CardDescription>Estos detalles son obligatorios para que el cliente pueda crearse correctamente.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Label htmlFor="name">Nombre De Cliente</Label>
                        <Input type="text" disabled={isLoading} placeholder="Nombre" {...register("name")} />
                        {errors.name && <p className="text-error">{errors.name.message}</p>}
                        <Label htmlFor="lastName">Apellidos</Label>
                        <Input type="text" disabled={isLoading} placeholder="Apellidos" {...register("lastName")} />
                        {errors.lastName && <p className="text-error">{errors.lastName.message}</p>}
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card className="bg-accent">
                    <CardHeader>
                        <CardTitle>Datos Adicionales</CardTitle>
                        <CardDescription>Estos datos son opcionales para que el cliente pueda crearse correctamente.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input type="text" disabled={isLoading} placeholder="Teléfono" {...register("phone")} />
                        {errors.phone && <p className="text-error">{errors.phone.message}</p>}
                        <Label htmlFor="email">Email</Label> <Input type="email" disabled={isLoading} placeholder="Email" {...register("email")} />
                        {errors.email && <p className="text-error">{errors.email.message}</p>}
                        <Label htmlFor="address">Dirección</Label> <Input type="text" disabled={isLoading} placeholder="Dirección" {...register("address")} />
                        {errors.address && <p className="text-error">{errors.address.message}</p>}
                        <Label htmlFor="legalName">Nombre Legal</Label> <Input type="text" disabled={isLoading} placeholder="Nombre Legal" {...register("legalName")} />
                        {errors.legalName && <p className="text-error">{errors.legalName.message}</p>}
                        <Label htmlFor="cuitCuil">CUIT/CUIL</Label> <Input type="text" disabled={isLoading} placeholder="CUIT/CUIL" {...register("cuitCuil")} />
                        {errors.cuitCuil && <p className="text-error">{errors.cuitCuil.message}</p>}
                    </CardContent>
                </Card>
            </div>
        </form>
    )
}

export default NewClientForm