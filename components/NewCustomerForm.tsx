"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { customerSchema } from "@/lib/schemas"
import { CustomerInputValues } from "@/lib/types"
import { useNewProductStore } from "@/stores/newProductStore"
import { createNewCustomer } from "@/actions/createNewCustomer"
import { toast } from "./ui/use-toast"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { Check, Loader } from "lucide-react"
import { useDialogStore } from "@/stores/generalDialog"

function NewCustomerForm() {
    const { data: session } = useSession()
    const [error, setError] = useState<string | null>(null)
    const { setIsLoading, isLoading } = useNewProductStore((state: any) => ({ isLoading: state.isLoading, setIsLoading: state.setIsLoading }))
    const { setClose } = useDialogStore((state: any) => state)
    const { register, handleSubmit, formState: { errors } } = useForm<CustomerInputValues>({
        defaultValues: {
            name: "",
            lastName: "",
            phone: "",
            email: "",
            address: "",
            legalName: "",
            cuitCuil: ""
        },
        resolver: yupResolver(customerSchema)
    })

    const onSubmit: SubmitHandler<CustomerInputValues> = (data: CustomerInputValues) => {
        setIsLoading(true)
        createNewCustomer({
            name: data.name,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            address: data.address,
            legalName: data.legalName,
            cuitCuil: data.cuitCuil,

        }, session?.user.id as string).then((data) => {
            if (data?.error) {
                throw new Error(data.error)
            }
            toast({
                title: "Cliente creado correctamente",
                description: "El cliente se ha creado correctamente, puedes verlo en la sección de clientes"
            })
            setClose()
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
        <form onSubmit={handleSubmit(onSubmit)} className="gap-4 grid grid-cols-1 lg:grid-cols-2" id="new-customer-form">
            <div className="self-stretch">
                <Card className="bg-primary-foreground h-full col-span-full">
                    <CardHeader>
                        <CardTitle>Detalles Del Cliente</CardTitle>
                        <CardDescription>Estos detalles son obligatorios para que el cliente pueda crearse correctamente.</CardDescription>
                    </CardHeader>
                    <CardContent className="gap-4 grid">
                        <div className="gap-4 grid">
                            <div className="gap-2 grid">
                                <div>
                                    <Label htmlFor="name">Nombre De Cliente</Label>
                                    <Input type="text" disabled={isLoading} placeholder="Nombre" {...register("name")} />
                                    {errors.name && <p className="text-error text-red-500">{errors.name.message}</p>}
                                </div>
                            </div>
                            <div className="gap-2 grid">
                                <div>
                                    <Label htmlFor="lastName">Apellidos</Label>
                                    <Input type="text" disabled={isLoading} placeholder="Apellidos" {...register("lastName")} />
                                    {errors.lastName && <p className="text-error text-red-500">{errors.lastName.message}</p>}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card className="bg-primary-foreground">
                    <CardHeader>
                        <CardTitle>Datos Adicionales</CardTitle>
                        <CardDescription>Estos datos son opcionales para que el cliente pueda crearse correctamente.</CardDescription>
                    </CardHeader>
                    <CardContent className="gap-4 grid">
                        <div className="gap-4 grid">
                            <div>
                                <Label htmlFor="phone">Teléfono</Label>
                                <Input type="text" disabled={isLoading} placeholder="Teléfono" {...register("phone")} />
                                {errors.phone && <p className="text-error">{errors.phone.message}</p>}
                            </div>
                        </div>
                        <div className="gap-4 grid">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" disabled={isLoading} placeholder="Email" {...register("email")} />
                                {errors.email && <p className="text-error">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className="gap-4 grid">
                            <div>
                                <Label htmlFor="address">Dirección</Label>
                                <Input type="text" disabled={isLoading} placeholder="Dirección" {...register("address")} />
                                {errors.address && <p className="text-error">{errors.address.message}</p>}
                            </div>
                        </div>
                        <div className="gap-4 grid">
                            <div>
                                <Label htmlFor="legalName">Nombre Legal</Label>
                                <Input type="text" disabled={isLoading} placeholder="Razón Social/Nombre Legal" {...register("legalName")} />
                                {errors.legalName && <p className="text-error">{errors.legalName.message}</p>}
                            </div>
                        </div>
                        <div className="gap-4 grid">
                            <div>
                                <Label htmlFor="cuitCuil">CUIT/CUIL</Label>
                                <Input type="text" disabled={isLoading} placeholder="CUIT/CUIL" {...register("cuitCuil")} />
                                {errors.cuitCuil && <p className="text-error">{errors.cuitCuil.message}</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-full">
                <Button form="new-customer-form" disabled={isLoading} className="flex justify-center items-center gap-2 mx-auto mt-8 group">
                    {isLoading ? <Loader className="animate-spin" /> : <Check className="group-hover:text-green-500" />}
                    <span className="text-muted-foreground">Guardar Cliente</span>
                </Button>
            </div>
        </form>
    )
}

export default NewCustomerForm