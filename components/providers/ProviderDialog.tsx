"use client"
import { useDialogStore } from "@/stores/generalDialog"
import CustomDialog from "../CustomDialog"
import CreateProviderForm from "./CreateProviderForm"
import CreateProviderOrderForm from "./CreateProviderOrderForm"

type Props = {
  userId: string
}
function ProviderDialog({ userId }: Props) {

  const { type, id } = useDialogStore((state: any) => state)

  const title: Record<string, string> = {
    "new-provider": "Crear Proveedor",
    "new-provider-order": "Nueva orden de compra"
  }

  return (
    <CustomDialog title={title[type]} fullWidth>
      {type === "new-provider" && <CreateProviderForm userId={userId} />}
      {type === "new-provider-order" && <CreateProviderOrderForm userId={userId} />}
    </CustomDialog>
  )
}
export default ProviderDialog