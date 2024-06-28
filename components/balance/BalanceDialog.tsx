"use client"
import { useDialogStore } from "@/stores/generalDialog"
import CustomDialog from "../CustomDialog"
import ManualIncomeForm from "../ManualIncomeForm"

type Props = {
  userId: string
}
function BalanceDialog({ userId }: Props) {
  const { type } = useDialogStore((state: any) => state)

  const config: Record<string, { title: string, fullWidth?: boolean }> = {
    "manual-income": {
      title: "Ingreso/Egreso Manual",
      fullWidth: false
    }
  }

  return (
    <CustomDialog title={type ? config[type].title : "Custom Dialog"} fullWidth={type ? config[type].fullWidth : false} >
      {type === "manual-income" && <ManualIncomeForm userId={userId} />}
    </CustomDialog>
  )
}
export default BalanceDialog