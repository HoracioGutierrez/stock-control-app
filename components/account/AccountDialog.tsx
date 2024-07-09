"use client"
import { useDialogStore } from "@/stores/generalDialog"
import CustomDialog from "../CustomDialog"
import AccountEditForm from "./AccountEditForm"
import { useState } from "react"
import { toast } from "../ui/use-toast"
import { Check, Loader } from "lucide-react"
import ChangePasswordForm from "./ChangePasswordForm"

type Props = {
  user: any
}
function AccountDialog({ user }: Props) {
  const { type, id } = useDialogStore((state: any) => state)
  const config: Record<string, { title: string, fullWidth?: boolean }> = {
    "change-password": {
      title: "Cambiar contraseña",
      fullWidth: false
    }
  }

  return (
    <CustomDialog title={type ? config[type].title : "Custom Dialog"} fullWidth={type ? config[type].fullWidth : false} >
      {type === "change-password" && <ChangePasswordForm user={user} />}
    </CustomDialog>
  )

}
export default AccountDialog