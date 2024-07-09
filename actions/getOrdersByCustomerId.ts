"use server"

import { GeneralResponse } from "@/lib/types"
import { db, orders, purchaseOrders, purchaseOrderProducts, productOrders } from "@/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const getOrdersByCustomerId = async (customerId: string): Promise<GeneralResponse> => {
  "use server"
  try {

    const ordersFromDB = await db.select({
      id: orders.id,
      total: orders.total,
      status: orders.status,
      paymentMethod: orders.paymentMethod,
      createdAt: orders.createdAt,
      itemCount: sql<number>`sum(${productOrders.quantity})`.as("itemCount"),
    })
      .from(orders)
      .where(eq(orders.customerId, customerId))
      .orderBy(orders.createdAt)
      .innerJoin(productOrders, eq(productOrders.orderId, orders.id))
      .groupBy(orders.id)

    if (ordersFromDB.length === 0) throw new Error("No se encontraron compras realizadas por este cliente")

    return {
      data: ordersFromDB,
      error: null,
      message: "Compras realizadas encontradas"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: [],
        error: error.message,
        message: error.message
      }
    }
    return {
      data: [],
      error: "Error al obtener las compras realizadas por este cliente",
      message: "Error al obtener las compras realizadas por este cliente"
    }
  }
}