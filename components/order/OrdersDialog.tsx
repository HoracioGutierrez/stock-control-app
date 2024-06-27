"use client"
import { useDialogStore } from "@/stores/generalDialog"
import CustomDialog from "../CustomDialog"
import { useState } from "react"
import { toast } from "../ui/use-toast"
import CancelOrderForm from "./CancelOrderForm"


type Props = {
  userId: string
}

function OrdersDialog({ userId }: Props) {

  const { type, id } = useDialogStore((state: any) => state)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const config: Record<string, { title: string, fullWidth?: boolean }> = {
    "cancel-order": {
      title: "Cancelar orden",
      fullWidth: false
    }
  }

  return (
    <CustomDialog
      title={type ? config[type].title : "Custom Dialog"}
      fullWidth={type ? config[type].fullWidth : false}
    >
      {type === "cancel-order" && <CancelOrderForm userId={userId} orderId={id} />}
    </CustomDialog>
  )
}
export default OrdersDialog