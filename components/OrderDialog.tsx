"use client"

import { useEffect, useState } from "react"
import CustomDialog from "./CustomDialog"
import OpenCashRegisterForm from "./OpenCashRegisterForm"
import { Button } from "./ui/button"
import { useDialogStore } from "@/stores/generalDialog"
import ConfirmCloseCashRegisterButton from "./cashRegister/ConfirmCloseCashRegisterButton"
import ConfirmSaveOrderButton from "./order/ConfirmSaveOrderButton"

type Props = {
  userId: string
  data: any[]
  cashRegisters?: any
}

const OrderDialog = ({ userId, data , cashRegisters }: Props) => {

  const [title, setTitle] = useState<string>("Abrir Caja")
  const { type } = useDialogStore((state: any) => state)

  const titles: Record<string, string> = { 
    "open-cash-register": "Abrir Caja",
    "close-cash-register": "Cerrar Caja",
    "save-order": "Guardar Orden"
  }

  useEffect(() => {
    setTitle(titles[type])
  }, [type])

  return (
    <CustomDialog title={title} userId={userId as string}>
      {type === "close-cash-register" && (
        <ConfirmCloseCashRegisterButton cashRegisters={cashRegisters} userId={userId as string} />
      )}
      {type === "open-cash-register" && (
        <OpenCashRegisterForm userId={userId as string} data={data} />
      )}
      {type === "save-order" && (
        <>
          <ConfirmSaveOrderButton userId={userId} cashRegisters={cashRegisters}/>
        </>
      )}
    </CustomDialog>
  )
}
export default OrderDialog