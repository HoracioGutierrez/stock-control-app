import { products, customers, providers, history, cashRegister } from "@/schema"

export const entitiesPropsById = {
  product: products,
  customer: customers,
  provider: providers,
  history: history,
  cashRegister: cashRegister
}

export const entityName= {
  product: "producto",
  customer: "cliente",
  provider: "proveedor",
  history: "historial",
  cashRegister: "registro"
}