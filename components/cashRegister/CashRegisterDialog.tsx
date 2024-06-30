"use client"
import { useDialogStore } from "@/stores/generalDialog"
import CustomDialog from "../CustomDialog"
import NewCashRegisterForm from "../NewCashRegisterForm"
import ConfirmCloseCashRegisterButton from "./ConfirmCloseCashRegisterButton"
import ConfirmOpenCashRegisterButton from "./ConfirmOpenCashRegisterButton"
import ConfirmDeleteCashRegisterButton from "./ConfirmDeleteCashRegisterButton"
import ConfirmReactivateCashRegisterButton from "./ConfirmReactivateCashRegisterButton"
import EditCashRegisterForm from "./EditCashRegisterForm"
import ManualIncomeForm from "../ManualIncomeForm"

type Props = {
  userId: string
  data: any
}
const CashRegisterDialog = ({ data, userId }: Props) => {

  const { type, id } = useDialogStore((state: any) => state)

  const title: Record<string, string> = {
    "new-cash-register": "Crear Caja",
    "delete-cash-register-close": "Cerrar Caja",
    "activate-cash-register-close": "Abrir Caja",
    "delete-cash-register-delete": "Borrar Caja",
    "activate-cash-register-delete": "Reactivar Caja",
    "edit-cash-register": "Editar Caja",
    "manual-income": "Ingreso/Retiro Manual"
  }

  return (
    <CustomDialog title={title[type]}>
      {type === "new-cash-register" && <NewCashRegisterForm userId={userId} />}
      {type === "delete-cash-register-close" && <ConfirmCloseCashRegisterButton cashRegisters={{ id }} userId={userId} />}
      {type === "activate-cash-register-close" && <ConfirmOpenCashRegisterButton cashRegisters={{ id }} userId={userId} />}
      {type === "delete-cash-register-delete" && <ConfirmDeleteCashRegisterButton cashRegisters={{ id }} userId={userId} />}
      {type === "activate-cash-register-delete" && <ConfirmReactivateCashRegisterButton cashRegisters={{ id }} userId={userId} />}
      {type === "edit-cash-register" && <EditCashRegisterForm data={data} userId={userId} />}
      {type === "manual-income" && (
        <ManualIncomeForm userId={userId} />
      )}
    </CustomDialog>
  )
}
export default CashRegisterDialog