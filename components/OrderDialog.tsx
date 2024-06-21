"use client"

import { useEffect, useState } from "react"
import CustomDialog from "./CustomDialog"
import OpenCashRegisterForm from "./OpenCashRegisterForm"
import { useDialogStore } from "@/stores/generalDialog"
import ConfirmCloseCashRegisterButton from "./cashRegister/ConfirmCloseCashRegisterButton"
import ConfirmSaveOrderButton from "./order/ConfirmSaveOrderButton"
import ManualScan from "./order/ManualScan"
import AddCustomerForm from "./order/AddCustomerForm"
import PayWithForm from "./order/PayWithForm"

type Props = {
  userId: string
  data: any[]
  cashRegisters?: any
}

const OrderDialog = ({ userId, data, cashRegisters }: Props) => {

  const [title, setTitle] = useState<string>("Abrir Caja")
  const { type } = useDialogStore((state: any) => state)

  const titles: Record<string, string> = {
    "open-cash-register": "Abrir Caja",
    "close-cash-register": "Cerrar Caja",
    "save-order": "Guardar Orden",
    "manual-scan": "Escaneo Manual",
    "add-customer": "Agregar Cliente",
    "pay-with": "Pagar con"
  }

  useEffect(() => {
    setTitle(titles[type])
  }, [type])

  return (
    <CustomDialog title={title}>
      {type === "close-cash-register" && (
        <ConfirmCloseCashRegisterButton cashRegisters={cashRegisters} userId={userId as string} />
      )}
      {type === "open-cash-register" && (
        <OpenCashRegisterForm userId={userId as string} data={data} />
      )}
      {type === "save-order" && (
        <>
          <ConfirmSaveOrderButton userId={userId} cashRegisters={cashRegisters} />
        </>
      )}
      {type === "manual-scan" && (
        <ManualScan />
      )}
      {type === "add-customer" && (
        <AddCustomerForm />
      )}
      {
        type === "pay-with" && (
          <PayWithForm />
        )
      }
    </CustomDialog>
  )
}
export default OrderDialog