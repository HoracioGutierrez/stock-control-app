"use client"
import { useDialogStore } from "@/stores/generalDialog"
import CustomDialog from "../CustomDialog"
import NewCashRegisterForm from "../NewCashRegisterForm"

type Props = {
  userId: string
}
const CashRegisterDialog = ({ userId }: Props) => {

  const { type } = useDialogStore((state: any) => state)

  const title: Record<string, string> = {
    "new-cash-register": "Crear Caja",
    "delete-cash-register-close": "Cerrar Caja",
    "activate-cash-register-close": "Abrir Caja"
  }

  return (
    <CustomDialog title={title[type]}>
      {type === "new-cash-register" && <NewCashRegisterForm userId={userId} />}
    </CustomDialog>
  )
}
export default CashRegisterDialog