"use server"
import { GeneralResponse } from "@/lib/types"
import { cashRegister, db, products, providers, purchaseOrderProducts, purchaseOrders } from "@/schema"
import { eq, sql } from "drizzle-orm"

export const getPurchaseOrderDetails = async (purchaseOrderId: string): Promise<GeneralResponse> => {
  "use server"
  try {

    const purchaseOrdersFromDB = await db.select({
      id: purchaseOrders.id,
      total: purchaseOrders.total,
      status: purchaseOrders.status,
      providerName: providers.name,
      providerLastName: providers.lastName,
      providersCompanyName: providers.companyName,
      cashRegister: cashRegister.label,
    })
      .from(purchaseOrders)
      .where(eq(purchaseOrders.id, purchaseOrderId))
      .innerJoin(providers, eq(purchaseOrders.providerId, providers.id))
      .innerJoin(cashRegister, eq(purchaseOrders.cashRegisterId, cashRegister.id))

    const purchaseOrderProductsFromDB = await db.select({
      id: purchaseOrderProducts.id,
      name: products.name,
      price: products.price,
      quantity: purchaseOrderProducts.quantity,
      total: sql<number>`${products.price} * ${purchaseOrderProducts.quantity}`,
    })
      .from(purchaseOrderProducts)
      .where(eq(purchaseOrderProducts.purchaseOrderId, purchaseOrderId))
      .innerJoin(products, eq(purchaseOrderProducts.productId, products.id))

    if (purchaseOrdersFromDB.length === 0) throw new Error("La orden de compra no existe")

    return {
      data: {
        ...purchaseOrdersFromDB[0],
        products: purchaseOrderProductsFromDB,
      },
      error: null,
      message: "Orden de compra encontrada"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al obtener la orden de compra"
      }
    }

    return {
      data: null,
      error: "Error al obtener la orden de compra",
      message: "Error al obtener la orden de compra"
    }
  }
}