"use client"
import { useDialogStore } from "@/stores/generalDialog"
import CustomDialog from "../CustomDialog"
import { Data, dataForHeaders, popUpData } from "./dataForHelp"
import PopUpList from "./PopUpList"
import { useEffect, useState } from "react"

const config: Record<string, { title: string }> = {
  "first-steps": { title: "Primeros pasos" },
  "customer-management": { title: "Gestión de clientes" },
  "product-management": { title: "Gestión de productos" },
  "order-management": { title: "Gestión de pedidos" },
  "cancel-order": { title: "Cancelar pedido" },
  "payment-management": { title: "Gestión de pagos" },
  "history-management": { title: "Gestión de historial" },
  "cash-management": { title: "Gestión de caja" },
  "price-management": { title: "Gestión de precios" },
}

const propsConfig: Record<string, string> = {
  "first-steps": "firstSteps",
  "customer-management": "customerManagement",
  "product-management": "productManagement",
  "order-management": "orderManagement",
  "cancel-order": "cancelOrder",
  "payment-management": "paymentManagement",
  "history-management": "historyManagement",
  "cash-management": "cashManagement",
  "price-management": "priceManagement",
}

function HelpDialog() {
  const { type } = useDialogStore((state: any) => state)
  const [dataAccordion, setDataAccordion] = useState<any>({}) as any
  const [dataHeader, setDataHeader] = useState<any>({}) as any

  const openedItem = propsConfig[type]


  useEffect(() => {
    const accordionData = popUpData[propsConfig[type]] as any
    const headerData = dataForHeaders[propsConfig[type]] as any

    setDataAccordion(accordionData)
    setDataHeader(headerData)

  }, [type])

  const props = {
    dataAccordion,
    dataHeader,
    openedItem
  }

  return (
    <>
      <CustomDialog title={type ? config[type].title : "Custom Dialog"} fullWidth={true} >
        <PopUpList  {...props} />
      </CustomDialog>

    </>
  )
}

export default HelpDialog