import { db, products, customers, providers, history, cashRegister } from "@/schema"

export const entitiesPropsById = {
  product: products,
  customer: customers,
  provider: providers,
  history: history,
  cashRegister: cashRegister
}