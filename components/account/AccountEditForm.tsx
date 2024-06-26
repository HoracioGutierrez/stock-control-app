"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { accountSchema } from "@/lib/schemas"
import * as yup from "yup"
import { Button } from "../ui/button"
import { editById } from "@/actions/editById"
import { toast } from "../ui/use-toast"
import { Check, Loader } from "lucide-react"
import CustomButton from "../layout/CustomButton"

type Props = {
  user: any
}

function AccountEditForm({ user }: Props) {

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors, isDirty, dirtyFields }, reset } = useForm<any>({
    defaultValues: {
      name: user.name,
      email: user.email,
      username: user.username,
    },
    resolver: yupResolver(accountSchema)
  })

  const toggleEdit = () => {
    setEdit(!edit)
  }

  const onSubmit: SubmitHandler<any> = (data: any) => {
    const fields: Record<string, string> = {}
    Object.keys(dirtyFields).forEach((key) => {
      fields[key] = data[key]
    })
    setLoading(true)
    editById("user", user.id, fields, user.id)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Datos actualizados correctamente",
          description: "Los datos de tu cuenta se han actualizado correctamente, puedes verlos en la sección de cuenta",
        })
        setEdit(false)
      })
      .catch((error) => {
        if (error instanceof Error) {
          return toast({
            variant: "destructive",
            title: "Error al actualizar los datos",
            description: error.message
          })
        }
        return toast({
          variant: "destructive",
          title: "Error al actualizar los datos",
          description: error.message
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <Card className="bg-primary-foreground">
        <CardHeader>
          <CardTitle>Datos de usuario</CardTitle>
        </CardHeader>
        <CardContent className="gap-4 grid">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="gap-4 grid">
              <div className="gap-2 grid">
                <Label htmlFor="name">Nombre</Label>
                <Input type="text" placeholder="Nombre" {...register("name")} disabled={!edit} />
                {errors.name && <p className="text-red-500">{errors.name.message as string}</p>}
              </div>
              <div className="gap-2 grid">
                <Label htmlFor="email">Email</Label>
                <Input type="text" placeholder="Email" {...register("email")} disabled={!edit} />
                {errors.email && <p className="text-red-500">{errors.email.message as string}</p>}
              </div>
              <div className="gap-2 grid">
                <Label htmlFor="username">Nombre de usuario</Label>
                <Input type="text" placeholder="Nombre de usuario" {...register("username")} disabled={!edit} />
                {errors.username && <p className="text-red-500">{errors.username.message as string}</p>}
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              {!edit && (
                <Button className="" onClick={toggleEdit} type="button">
                  Editar
                </Button>
              )}
              {edit && (
                <Button className="" type="submit">
                  {loading ? <Loader className="animate-spin" /> : <Check />}
                  Guardar cambios
                </Button>
              )}
              <CustomButton dialogType="change-password">modificar contraseña</CustomButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
export default AccountEditForm