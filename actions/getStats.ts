import { GeneralResponse } from "@/lib/types";
import { db, orders, products } from "@/schema";
import { count, sum } from "drizzle-orm";

export const getStats = async (): Promise<GeneralResponse> => {

  try {
    const salesStats = await db.select({ count: count() , value: sum(orders.total) }).from(orders)
    const productsCount = await db.select({ count: count() }).from(products)

    if(salesStats.length === 0 || productsCount.length === 0) throw new Error("Error al obtener los datos")

    return {
      data: {
        salesStats : salesStats[0],
        productsCount : productsCount[0]
      },
      error: null,
      message: "Datos obtenidos correctamente"
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al obtener los datos"
      }
    }

    return {
      data: null,
      error: "Error al obtener los datos",
      message: "Error al obtener los datos"
    }
  }

  return {
    data: {
      productsLength: 10,
      ordersLength: 10
    },
    error: null,
    message: "Stats obtenido correctamente"
  }
}