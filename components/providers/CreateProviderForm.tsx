"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { createNewProvider } from "@/actions/createNewProvider"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDialogStore } from "@/stores/generalDialog"
import { yupResolver } from "@hookform/resolvers/yup"
import { ProviderInputValues } from "@/lib/types"
import { providerSchema } from "@/lib/schemas"
import { Check, Loader } from "lucide-react"
import { toast } from "../ui/use-toast"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState } from "react"

type CreateProviderFormProps = {
  userId: string
}

function CreateProviderForm({ userId }: CreateProviderFormProps) {

  const { setClose } = useDialogStore((state: any) => state)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProviderInputValues>({
    defaultValues: {
      name: "",
      lastName: "",
      companyName: "",
      address: "",
      phone: "",
      email: "",
      cuitCuil: "",
    },
    resolver: yupResolver(providerSchema)
  })

  const onSubmit: SubmitHandler<ProviderInputValues> = (data: ProviderInputValues) => {
    setIsLoading(true)
    createNewProvider(data, userId)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Proveedor creado correctamente",
          description: "El proveedor se ha creado correctamente, puedes verlo en la sección de proveedores"
        })
        reset()
      })
      .catch((error) => {
        if (error instanceof Error) {

          return toast({
            variant: "destructive",
            title: "Error al crear el proveedor",
            description: error.message
          })

        }
        toast({
          variant: "destructive",
          title: "Error al crear el proveedor",
          description: error.message
        })
      })
      .finally(() => {
        setIsLoading(false)
        setClose()
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="" id="new-provider-form">
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
        <Card className="bg-primary-foreground">
          <CardHeader>
            <CardTitle>Detalles</CardTitle>
          </CardHeader>
          <CardContent className="gap-4 grid">
            <div className="gap-2 grid">
              <div>
                <Label htmlFor="name" className="text-muted-foreground">Nombre</Label>
                {errors.name && <p className="font-bold text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <Input type="text" disabled={isLoading} placeholder="Nombre" {...register("name")} />
            </div>
            <div className="gap-2 grid">
              <div>
                <Label htmlFor="lastName" className="text-muted-foreground">Apellido</Label>
                {errors.lastName && <p className="font-bold text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
              <Input type="text" disabled={isLoading} placeholder="Apellidos" {...register("lastName")} />
            </div>
            <div className="gap-2 grid">
              <div>
                <Label htmlFor="cuitCuil" className="text-muted-foreground">CUIT/CUIL</Label>
                {errors.cuitCuil && <p className="font-bold text-red-500 text-sm">{errors.cuitCuil.message}</p>}
              </div>
              <Input type="text" disabled={isLoading} placeholder="CUIT/CUIL" {...register("cuitCuil")} />
            </div>
            <div className="gap-2 grid">
              <div>
                <Label htmlFor="companyName" className="text-muted-foreground">Nombre de la compañía</Label>
                {errors.companyName && <p className="font-bold text-red-500 text-sm">{errors.companyName.message}</p>}
              </div>
              <Input type="text" disabled={isLoading} placeholder="Nombre de la compañía" {...register("companyName")} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-primary-foreground">
          <CardHeader>
            <CardTitle>Contacto</CardTitle>
          </CardHeader>
          <CardContent className="gap-4 grid">
            <div className="gap-2 grid">
              <div>
                <Label htmlFor="address" className="text-muted-foreground">Dirección</Label>
                {errors.address && <p className="font-bold text-red-500 text-sm">{errors.address.message}</p>}
              </div>
              <Input type="text" disabled={isLoading} placeholder="Dirección" {...register("address")} />
            </div>
            <div className="gap-2 grid">
              <div>
                <Label htmlFor="phone" className="text-muted-foreground">Teléfono</Label>
                {errors.phone && <p className="font-bold text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
              <Input type="text" disabled={isLoading} placeholder="Teléfono" {...register("phone")} />
            </div>
            <div className="gap-2 grid">
              <div>
                <Label htmlFor="email" className="text-muted-foreground">Correo electrónico</Label>
                {errors.email && <p className="font-bold text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <Input type="text" disabled={isLoading} placeholder="Correo electrónico" {...register("email")} />
            </div>
          </CardContent>
        </Card>
        <Button disabled={isLoading} className="flex items-center gap-2 md:col-span-2 mx-auto">
          {isLoading ? <Loader className="animate-spin" /> : <Check />}
          <span>Guardar proveedor</span>
        </Button>
      </div>
    </form>
  )
}

export default CreateProviderForm