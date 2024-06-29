"use server"

import { GeneralResponse } from "@/lib/types"
import { db, orders, purchaseOrders, purchaseOrderProducts } from "@/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const getOrdersByCustomerId = async (customerId: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const ordersFromDB = await db.select().from(orders).where(eq(orders.customerId, customerId)).orderBy(orders.createdAt)

    if (ordersFromDB.length === 0) throw new Error("No se encontraron compras realizadas por este cliente")

    return {
      data: ordersFromDB,
      error: null,
      message: "Compras realizadas encontradas"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al obtener las compras realizadas por este cliente"
      }
    }
    return {
      data: null,
      error: "Error al obtener las compras realizadas por este cliente",
      message: "Error al obtener las compras realizadas por este cliente"
    }
  }
}