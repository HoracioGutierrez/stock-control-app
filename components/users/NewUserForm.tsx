"use client"
import { yupResolver } from "@hookform/resolvers/yup"
import { userSchema } from "@/lib/schemas"
import { SubmitHandler, useForm } from "react-hook-form"
import { Check, Loader } from "lucide-react"
import { toast } from "../ui/use-toast"
import { Button } from "../ui/button"
import { useState } from "react"
import { Edit, UserPlus } from "lucide-react"
import { useDialogStore } from "@/stores/generalDialog"
import { createNewUser } from "@/actions/createNewUser"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

type NewUserFormProps = {
  userId: string
}

function NewUserForm({ userId }: NewUserFormProps) {

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const { setClose } = useDialogStore((state: any) => state)
  const { register, handleSubmit, formState: { errors } } = useForm<any>({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      isAdmin: false
    },
    resolver: yupResolver(userSchema)
  })

  const onSubmit: SubmitHandler<any> = (data: any) => {
    setLoading(true)
    createNewUser(data, userId)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Usuario creado correctamente",
          description: "El usuario se ha creado correctamente, puedes verlo en la sección de usuarios"
        })
        setClose()
      })
      .catch((error) => {
        if (error instanceof Error) {
          return setError(error.message)
        }
        setError("Error al crear el usuario, intente nuevamente o contacte al desarrollador.")
        toast({
          variant: "destructive",
          title: "Error al crear el usuario",
          description: error.message
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleChecked = (e: any) => {
    setIsChecked(!isChecked)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="gap-8">
      <div className="gap-4 grid">
        <div className="gap-2 grid">
          <Label htmlFor="name">Nombre</Label>
          <Input type="text" placeholder="Nombre" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message as string}</p>}
        </div>
        <div className="gap-2 grid">
          <Label htmlFor="email">Email</Label>
          <Input type="text" placeholder="Email" {...register("email")} />
          {errors.email && <p className="text-red-500">{errors.email.message as string}</p>}
        </div>
        <div className="gap-2 grid">
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input type="text" placeholder="Nombre de usuario" {...register("username")} />
          {errors.username && <p className="text-red-500">{errors.username.message as string}</p>}
        </div>
        <div className="gap-2 grid">
          <Label htmlFor="password">Contraseña</Label>
          <Input type="password" placeholder="Contraseña" {...register("password")} />
          {errors.password && <p className="text-red-500">{errors.password.message as string}</p>}
        </div>
        <div className="gap-2 grid">
          <Label htmlFor="isAdmin">Es admin</Label>
          <Checkbox {...register("isAdmin")} onCheckedChange={handleChecked} checked={isChecked} />
          {errors.isAdmin && <p className="text-red-500">{errors.isAdmin.message as string}</p>}
        </div>
        <Button className="w-full">
          {loading ? <Loader className="animate-spin" /> : <Check />}
          <span>Guardar usuario</span>
        </Button>
      </div>
    </form>
  )
}

export default NewUserForm