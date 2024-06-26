"use client"
import { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Check, Loader } from "lucide-react"
import { Button } from "../ui/button"
import { changeUserPassword } from "@/actions/changeUserPassword"
import { toast } from "../ui/use-toast"
import { useDialogStore } from "@/stores/generalDialog"

type Props = {
  user: any
}

function ChangePasswordForm({ user }: Props) {

  const [loading, setLoading] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true)
  const [validationError, setValidationError] = useState<string>("")
  const { setClose } = useDialogStore((state: any) => state)

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) return setPasswordMatch(false)
    if (!newPassword || !confirmPassword) {
      return setValidationError("La contraseña no puede estar vacía")
    }

    if (newPassword.trim().length === 0 || confirmPassword.trim().length === 0) {
      return setValidationError("La contraseña no puede estar vacía")
    }
    setLoading(true)
    changeUserPassword(user.id, newPassword)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Contraseña cambiada correctamente",
          description: "La contraseña se ha cambiado correctamente, puedes verla en la sección de cuenta",
        })
        setClose()
      })
      .catch((error) => {
        if (error instanceof Error) {
          return toast({
            variant: "destructive",
            title: "Error al cambiar la contraseña",
            description: error.message
          })
        }
        return toast({
          variant: "destructive",
          title: "Error al cambiar la contraseña",
          description: error.message
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setNewPassword(newPassword)
    setValidationError("")
    setPasswordMatch(newPassword === confirmPassword)
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value
    setConfirmPassword(confirmPassword)
    setPasswordMatch(newPassword === confirmPassword)
    setValidationError("")
  }

  return (
    <div>
      <div className="gap-4 grid">
        <div className="gap-2 grid">
          <Label htmlFor="newPassword">Nueva contraseña</Label>
          <Input type="password" placeholder="Nueva contraseña" onChange={handlePasswordChange} />
        </div>
        <div className="gap-2 grid">
          <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
          {!passwordMatch && <p className="text-red-500">Las contraseñas no coinciden</p>}
          <Input type="password" placeholder="Confirmar contraseña" onChange={handleConfirmPasswordChange} />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2 mt-8">
        {validationError && <p className="text-center text-red-500">{validationError}</p>}
        <Button onClick={handleSubmit} disabled={!passwordMatch}>
          {loading ? <Loader className="animate-spin" /> : <Check />}
          Confirmar
        </Button>
      </div>
    </div>
  )
}
export default ChangePasswordForm