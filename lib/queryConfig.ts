import { products, customers, providers, history, cashRegister, users } from "@/schema"

export const entitiesPropsById = {
  product: products,
  customer: customers,
  provider: providers,
  history: history,
  cashRegister: cashRegister,
  user: users
}

export const entityName = {
  product: "Producto",
  customer: "Cliente",
  provider: "Proveedor",
  history: "Historial",
  cashRegister: "Registro de Caja",
  user: "Usuario"
}