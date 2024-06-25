"use server"

import { GeneralResponse } from "@/lib/types"
import { db, orders , cashRegister, customers } from "@/schema"
import { and, asc, eq, gt, lt } from "drizzle-orm"

export const getAllOrders = async (startDate?: string, endDate?: string): Promise<GeneralResponse> => {
  "use server"
  try {
    //const ordersFromDB = await db.select().from(orders).orderBy(asc(orders.name))
    let ordersFromDB: any

    if (startDate && endDate) {
      ordersFromDB = await db.select().from(orders).where(and(gt(orders.createdAt, startDate), lt(orders.createdAt, endDate))).orderBy(asc(orders.createdAt)).innerJoin(cashRegister, eq(cashRegister.id, orders.cashRegisterId)).innerJoin(customers, eq(customers.id, orders.customerId))
    }

    if (startDate && !endDate) {
      ordersFromDB = await db.select().from(orders).where(gt(orders.createdAt, startDate)).orderBy(asc(orders.createdAt)).innerJoin(cashRegister, eq(cashRegister.id, orders.cashRegisterId)).innerJoin(customers, eq(customers.id, orders.customerId))
    }

    if (!startDate && endDate) {
      ordersFromDB = await db.select().from(orders).where(lt(orders.createdAt, endDate)).orderBy(asc(orders.createdAt)).innerJoin(cashRegister, eq(cashRegister.id, orders.cashRegisterId)).innerJoin
    }

    if (!startDate && !endDate) {
      ordersFromDB = await db.select().from(orders).orderBy(asc(orders.createdAt)).innerJoin(cashRegister, eq(cashRegister.id, orders.cashRegisterId)).innerJoin(customers, eq(customers.id, orders.customerId))
    }

    return {
      data: ordersFromDB,
      error: null,
      message: "Orders found"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error getting orders"
      }
    }

    return {
      data: null,
      error: "Error getting orders",
      message: "Error getting orders"
    }
  }
}