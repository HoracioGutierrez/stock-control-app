"use client"
import { SubmitHandler, useForm } from "react-hook-form"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "@/lib/schemas"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Loader } from "lucide-react"
import { LoginInputValues } from "@/lib/types"


function LoginForm() {

  const [loginError, setLoginError] = useState<string | null>(null)
  const [pending, setPending] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputValues>({
    defaultValues: {
      username: "",
      password: ""
    },
    resolver: yupResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<LoginInputValues> = (data: LoginInputValues) => {
    setPending(true)
    setLoginError(null)
    signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false
    })
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        window.location.href = "/"
      })
      .catch((error) => {
        if (error instanceof Error) {
          if (error.message === "Configuration") {
            return setLoginError("El usuario o contraseña no es válido, intente nuevamente o contacte al desarrollador.")
          }
          return setLoginError(error.message)
        }
        setLoginError("Error al iniciar sesión, intente nuevamente o contacte al desarrollador.")
      })
      .finally(() => {
        setPending(false)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {loginError && <p className="text-red-500">{loginError}</p>}
      <div className="grid gap-2">
        <Label htmlFor="username">Usuario</Label>
        <Input type="text" placeholder="user-1" {...register("username")} />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" placeholder="********" {...register("password")} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full">
        {pending ? <Loader className="animate-spin" /> : "Login"}
      </Button>
    </form>
  )
}
export default LoginForm