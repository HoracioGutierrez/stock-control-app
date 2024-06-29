import { ColumnDef } from "@tanstack/react-table"
import { balanceColumns, cashRegistersColumns, customerOrdersColumns, customersColumns, historyColumns, ordersColumns, productsColumns, providersColumns, purchaseOrdersColumns, usersColumns } from "./columnDefinitions"

export const columns: Record<"products" | "history" | "providers" | "customers" | "cash-registers" | "orders" | "users" | "balance" | "purchase-orders" | "customer-orders", ColumnDef<unknown | any>[]> = {
  "products": productsColumns,
  "history": historyColumns,
  "providers": providersColumns,
  "customers": customersColumns,
  "cash-registers": cashRegistersColumns,
  "orders": ordersColumns,
  "users": usersColumns,
  "balance": balanceColumns,
  "purchase-orders": purchaseOrdersColumns,
  "customer-orders": customerOrdersColumns
}

export const rewriteActionType: Record<string, string> = {
  "create-product": "Producto creado",
  "create-product-variant": "Variante creada",
  "increment-product": "Stock incrementado",
  "edit-product": "Producto editado",
  "edit-product-variant": "Variante editada",
  "unlink-variant": "Variante eliminada",
  "create-purchase-order": "Venta creada",
  "save-order": "Orden creada",
  "open-cash-register": "Caja abierta",
  "delete-cash-register": "Caja eliminada",
  "reactivate-cash-register": "Caja reactivada",
  "create-customer": "Cliente creado",
  "Usuario editado": "Usuario editado",
  "Usuario creado": "Usuario creado",
  "create-provider": "Proveedor creado",
  "refund-increment-stock": "Stock incrementado",
  "refund-cash-register": "Reembolso de caja",
  "refund-customer": "Reembolso de cliente",
  "close-cash-register": "Caja cerrada",
  "create-cash-register": "Caja creada",
  "Producto eliminado": "Producto eliminado",
  "Cliente eliminado": "Cliente eliminado",
  "Proveedor eliminado": "Proveedor eliminado",
  "Registro de Caja eliminado": "Registro de Caja eliminado",
  "Producto editado": "Producto editado",
  "Cliente editado": "Cliente editado",
  "Proveedor editado": "Proveedor editado",
  "Registro de Caja editado": "Registro de Caja editado",
  "Pago de la deuda": "Pago de deuda",
  "Producto reactivado": "Producto reactivado",
  "Cliente reactivado": "Cliente reactivado",
  "Proveedor reactivado": "Proveedor reactivado",
  "Registro de Caja reactivado": "Registro de Caja reactivado",
  "update-prices-all": "Precios actualizados por todos los productos",
  "update-prices-some": "Precios actualizados por algunos productos",
  "delete-product": "Producto eliminado",
  "delete-customer": "Cliente eliminado",
  "reactivate-product": "Producto reactivado",
  "cliente eliminado": "Cliente eliminado",
  "Cambio de contraseña": "Cambio de contraseña",
  "Nuevo usuario creado": "Nuevo usuario creado",
  "Usuario eliminado": "Usuario eliminado",
}

export const rewriteActionTypeMessage: Record<string, string> = {
  "products": "productos",
  "customers": "clientes",
  "providers": "proveedores",
  "cash-registers": "cajas",
  "orders": "pedidos",
}