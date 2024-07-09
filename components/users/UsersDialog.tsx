"use client"
import { useDialogStore } from "@/stores/generalDialog"
import CustomDialog from "../CustomDialog"
import DeleteUserConfirmationForm from "./DeleteUserConfirmationForm"
import EditFormContainer from "../EditFormContainer"
import NewUserForm from "./NewUserForm"

type Props = {
  userId: string
}
function UsersDialog({ userId }: Props) {
  const { type, id } = useDialogStore((state: any) => state)
  const config: Record<string, { title: string, fullWidth?: boolean }> = {
    "edit-user": {
      title: "Editar Usuario",
      fullWidth: true
    },
    "delete-user": {
      title: "Borrar Usuario",
      fullWidth: false
    },
    "activate-user": {
      title: "Activar Usuario",
      fullWidth: false
    },
    "new-user": {
      title: "Nuevo Usuario",
      fullWidth: false
    }
  }

  return (
    <CustomDialog title={type ? config[type].title : "Custom Dialog"} fullWidth={type ? config[type].fullWidth : false} >
      {type === "edit-user" && (
        <EditFormContainer
          entityType="user"
          userId={userId as string}
          hasDetails={true}
          hasVariants={false}
          entityId={id}
        />
      )}
      {(type === "delete-user" || type === "activate-user") && <DeleteUserConfirmationForm userId={userId as string} type={type} />}
      {type === "new-user" && <NewUserForm userId={userId as string} />}
    </CustomDialog>
  )
}
export default UsersDialog