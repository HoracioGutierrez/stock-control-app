import { GeneralResponse } from "@/lib/types";
import { db, orders, products } from "@/schema";
import { count, eq, gt, sql, sum } from "drizzle-orm";

export const getStats = async (): Promise<GeneralResponse> => {

  try {
    const salesStats = await db.select({ count: count(), value: sum(orders.total) }).from(orders)
    const productsCount = await db.select({ count: count() }).from(products)
    const today = new Date()
    const yesterday = new Date(today.getTime() - (1000 * 60 * 60 * 24 * 4))

    //const salesFromDB = await db.select().from(orders).where(gt(orders.createdAt, yesterday))
    //get the total amount of sales from each day only for the last 4 days
    const salesAmount = await db.select({
      count: count(),
      value: sum(orders.total),
      createdAt: orders.createdAt
    })
      .from(orders)
      .groupBy(orders.createdAt)
      .having(gt(orders.createdAt, yesterday))


    if (salesStats.length === 0 || productsCount.length === 0) throw new Error("Error al obtener los datos")

    return {
      data: {
        salesStats: salesStats[0],
        productsCount: productsCount[0],
        salesFromDB: salesAmount
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