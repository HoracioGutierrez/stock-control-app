"use client"
import { useDialogStore } from "@/stores/generalDialog"
import CustomDialog from "../CustomDialog"
import CreateProviderForm from "./CreateProviderForm"
import CreateProviderOrderForm from "./CreateProviderOrderForm"
import EditFormContainer from "../EditFormContainer"
import DeleteProviderConfirmationForm from "./DeleteProviderConfirmationForm"
import ProviderDetails from "./ProviderDetails"

type Props = {
  userId: string
}
function ProviderDialog({ userId }: Props) {

  const { type, id } = useDialogStore((state: any) => state)

  const title: Record<string, string> = {
    "new-provider": "Crear Proveedor",
    "new-provider-order": "Nueva orden de compra",
    "edit-provider": "Editar Proveedor",
    "delete-provider": "Borrar Proveedor",
    "activate-provider": "Activar Proveedor",
    "provider-details": "Detalles del Proveedor",
  }

  const entityProps = {
    entityType: "provider",
    entityId: id,
    userId,
    type,
    hasVariants: false,
    hasDetails: true,
  }

  return (
    <CustomDialog title={title[type]} fullWidth>
      {type === "new-provider" && <CreateProviderForm userId={userId} />}
      {type === "new-provider-order" && <CreateProviderOrderForm userId={userId} />}
      {type === "edit-provider" && <EditFormContainer {...entityProps} />}
      {type === "delete-provider" && <DeleteProviderConfirmationForm {...entityProps} type={type} />}
      {type === "activate-provider" && <DeleteProviderConfirmationForm {...entityProps} type={type} />}
      {type === "provider-details" && <ProviderDetails userId={userId} providerId={id} />}
    </CustomDialog>
  )
}
export default ProviderDialog