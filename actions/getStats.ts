import { GeneralResponse } from "@/lib/types";
import { db, orders, products } from "@/schema";
import { count, eq, gt, sql, sum } from "drizzle-orm";

export const getStats = async (): Promise<GeneralResponse> => {

  try {
    const salesStats = await db.select({ count: count(), value: sum(orders.total) }).from(orders)
    const productsCount = await db.select({ count: count() }).from(products)
    const salesAmountQuery = sql`
        SELECT
          DATE("stock-control-app_order"."createdAt") AS date,
          SUM("stock-control-app_order"."total") AS total,
          COUNT("stock-control-app_order"."id") AS count
        FROM "stock-control-app_order"
        GROUP BY "stock-control-app_order"."createdAt"
        HAVING "stock-control-app_order"."createdAt" > (now() - interval '7 days')
        ORDER BY "stock-control-app_order"."createdAt" ASC
      `

    const salesAmount = await db.execute(salesAmountQuery)

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