"use client"
import { useDialogStore } from "@/stores/generalDialog"
import CustomDialog from "../CustomDialog"
import { popUpData } from "./dataForHelp"
import PopUpList from "./PopUpList"

function HelpDialog() {
  const { type } = useDialogStore((state: any) => state)


  const config: Record<string, { title: string, fullWidth?: boolean }> = {
    "first-steps": {
      title: "Primeros pasos",
      fullWidth: true
    },
    "customer-management": {
      title: "Gestión de clientes",
      fullWidth: true
    },
    "product-management": {
      title: "Gestión de productos",
      fullWidth: true
    },
    "order-management": {
      title: "Gestión de pedidos",
      fullWidth: true
    },
    "cancel-order": {
      title: "Cancelar pedido",
      fullWidth: true
    },
    "payment-management": {
      title: "Gestión de pagos",
      fullWidth: true
    },
    "history-management": {
      title: "Gestión de historial",
      fullWidth: true
    },
    "cash-management": {
      title: "Gestión de caja",
      fullWidth: true
    },
    "price-management": {
      title: "Gestión de precios",
      fullWidth: true
    },
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

  const data = popUpData[propsConfig[type]] as any

  const props = {
    data,
    typeProp: type,
  }

  return (
    <>
      <CustomDialog title={type ? config[type].title : "Custom Dialog"} fullWidth={type ? config[type].fullWidth : false} >
        <PopUpList {...props} />
      </CustomDialog>

    </>
  )
}

export default HelpDialog