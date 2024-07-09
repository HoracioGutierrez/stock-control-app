import { GeneralResponse } from "@/lib/types";
import { customers, db, orders, products } from "@/schema";
import { asc, count, desc, eq, gt, lt, sql, sum } from "drizzle-orm";

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
    const customersWithDebt = await db.select().from(customers).where(lt(customers.currentAmount, 0)).limit(2).orderBy(asc(customers.currentAmount))
    const getTotalDebt = await db.select({ total : sql`sum(${orders.total})` }).from(orders).where(eq(orders.paymentMethod, "debt"))
    const topCustomers = await db.select().from(customers).where(lt(customers.currentAmount, 0)).limit(5).orderBy(asc(customers.currentAmount))
    const outOfStockProducts = await db.select().from(products).where(lt(products.stock, 10)).orderBy(asc(products.stock)).limit(4)

    if (salesStats.length === 0 || productsCount.length === 0) throw new Error("Error al obtener los datos")

    return {
      data: {
        salesStats: salesStats[0],
        productsCount: productsCount[0],
        salesFromDB: salesAmount,
        customersWithDebt: customersWithDebt,
        totalDebt: getTotalDebt[0].total || 0,
        topCustomers: topCustomers || [],
        outOfStockProducts: outOfStockProducts || []
      },
      error: null,
      message: "Datos obtenidos correctamente"
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: {},
        error: error.message,
        message: error.message
      }
    }

    return {
      data: {},
      error: "Error al obtener los datos",
      message: "Error al obtener los datos"
    }
  }
}