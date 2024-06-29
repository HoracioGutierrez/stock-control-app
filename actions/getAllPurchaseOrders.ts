"use server"
import { GeneralResponse } from "@/lib/types"
import { db, providers, purchaseOrderProducts, purchaseOrders } from "@/schema"
import { eq, sql } from "drizzle-orm"

export const getAllPurchaseOrders = async (): Promise<GeneralResponse> => {
  "use server"
  try {
    const purchaseOrdersFromDB = await db.select({
      id: purchaseOrders.id,
      total: purchaseOrders.total,
      status: purchaseOrders.status,
      createdAt: purchaseOrders.createdAt,
      itemCount: sql<number>`sum(${purchaseOrderProducts.quantity})`.as("itemCount"),
      providerName: providers.name,
      providerLastName: providers.lastName,
      providersCompanyName: providers.companyName,
    })
      .from(purchaseOrders)
      .orderBy(purchaseOrders.createdAt)
      .innerJoin(purchaseOrderProducts, eq(purchaseOrders.id, purchaseOrderProducts.purchaseOrderId))
      .innerJoin(providers, eq(purchaseOrders.providerId, providers.id))
      .groupBy(purchaseOrders.id,providers.name,providers.lastName,providers.companyName)

    return {
      data: purchaseOrdersFromDB || [],
      error: null,
      message: "Ordenes de compra encontradas"
    }
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al obtener las ordenes de compra"
      }
    }

    return {
      data: null,
      error: "Error al obtener las ordenes de compra",
      message: "Error al obtener las ordenes de compra"
    }
  }
}