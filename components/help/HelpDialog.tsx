"use client"
import { useHelpContext } from "./HelpContext"
import { useDialogStore } from "@/stores/generalDialog"
import PopUpListHeader from "./PopUpListHeader"
import CustomDialog from "../CustomDialog"

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


function HelpDialog() {
  const { type } = useDialogStore((state: any) => state)
  const { cardId, getCardsHeaders, headerCardsData, isLoading } = useHelpContext()
  
  return (
    <>
      <CustomDialog title={type ? config[type].title : "Custom Dialog"} fullWidth={type ? config[type].fullWidth : false} >

        <PopUpListHeader headerData={headerCardsData} />

      </CustomDialog>
    </>
  )
}

export default HelpDialog