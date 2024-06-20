"use client"

import { useEffect, useState } from "react"
import CustomDialog from "./CustomDialog"
import OpenCashRegisterForm from "./OpenCashRegisterForm"
import { Button } from "./ui/button"
import { useDialogStore } from "@/stores/generalDialog"
import ConfirmCloseCashRegisterButton from "./ConfirmCloseCashRegisterButton"

type Props = {
  userId: string
  data: any[]
  cashRegisters?: any
}

const OrderDialog = ({ userId, data, cashRegisters }: Props) => {

  const [title, setTitle] = useState<string>("Abrir Caja")
  const { type } = useDialogStore((state: any) => state)

  useEffect(() => {
    setTitle(type === "close-cash-register" ? "Cerrar Caja" : "Abrir Caja")
  }, [type])

  return (
    <CustomDialog title={title}>
      {type === "close-cash-register" && (
        <ConfirmCloseCashRegisterButton cashRegisters={cashRegisters} userId={userId as string} />
      )}
      {type === "open-cash-register" && (
        <OpenCashRegisterForm userId={userId as string} data={data} />
      )}
    </CustomDialog>
  )
}
export default OrderDialog