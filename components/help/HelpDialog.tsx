"use client"
import { useDialogStore } from "@/stores/generalDialog"
import CustomDialog from "../CustomDialog"
import FirstSteps from "./FirstStep"
import CustomerManagement from "./CustomerManagement"
import ProductManagement from "./ProductManagement"
import OrderManagement from "./OrderManagement"
import CancelOrder from "./CancelOrder"
import PaymentManagement from "./PaymentManagement"
import HistoryManagement from "./HistoryManagement"
import CashManagement from "./CashManagement"
import PriceManagement from "./PriceManagement"

function HelpDialog( ) {
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

  return (
    <>
      <CustomDialog title={type ? config[type].title : "Custom Dialog"} fullWidth={type ? config[type].fullWidth : false} >
          {type === "first-steps" && <FirstSteps />}
          {type === "customer-management" && <CustomerManagement />}
          {type === "product-management" && <ProductManagement />}
          {type === "order-management" && <OrderManagement />}
          {type === "cancel-order" && <CancelOrder />}
          {type === "payment-management" && <PaymentManagement />}
          {type === "history-management" && <HistoryManagement />}
          {type === "cash-management" && <CashManagement />}
          {type === "price-management" && <PriceManagement />}
      </CustomDialog>

    </>
  )
}

export default HelpDialog