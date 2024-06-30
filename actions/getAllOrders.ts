"use server"

import { GeneralResponse } from "@/lib/types"
import { db, orders, cashRegister, customers } from "@/schema"
import { and, asc, desc, eq, gt, lt, sql } from "drizzle-orm"

export const getAllOrders = async (startDate?: string, endDate?: string): Promise<GeneralResponse> => {
  "use server"
  try {
    let ordersFromDB: any

    if (startDate && endDate) {
      ordersFromDB = await db.select({
        id: orders.id,
        status: orders.status,
        paymentMethod: orders.paymentMethod,
        total : orders.total,
        createdAt: orders.createdAt,
        customerName : customers.name,
        customerLastName : customers.lastName,
        label: cashRegister.label,
      })
      .from(orders)
      .where(and(gt(orders.createdAt, startDate), lt(orders.createdAt, endDate)))
      .orderBy(desc(orders.createdAt))
      .innerJoin(cashRegister, eq(cashRegister.id, orders.cashRegisterId))
      .leftJoin(customers, eq(customers.id, orders.customerId))
    }

    if (startDate && !endDate) {
      ordersFromDB = await db.select({
        id: orders.id,
        status: orders.status,
        paymentMethod: orders.paymentMethod,
        total : orders.total,
        createdAt: orders.createdAt,
        customerName : customers.name,
        customerLastName : customers.lastName,
        label: cashRegister.label,
      }).from(orders).where(gt(orders.createdAt, startDate)).orderBy(desc(orders.createdAt)).innerJoin(cashRegister, eq(cashRegister.id, orders.cashRegisterId)).leftJoin(customers, eq(customers.id, orders.customerId))
    }

    if (!startDate && endDate) {
      ordersFromDB = await db.select({
        id: orders.id,
        status: orders.status,
        paymentMethod: orders.paymentMethod,
        total : orders.total,
        createdAt: orders.createdAt,
        customerName : customers.name,
        customerLastName : customers.lastName,
        label: cashRegister.label,
      }).from(orders).where(lt(orders.createdAt, endDate)).orderBy(desc(orders.createdAt)).innerJoin(cashRegister, eq(cashRegister.id, orders.cashRegisterId)).leftJoin(customers, eq(customers.id, orders.customerId))
    }

    if (!startDate && !endDate) {
      ordersFromDB = await db.select({
        id: orders.id,
        status: orders.status,
        paymentMethod: orders.paymentMethod,
        total : orders.total,
        createdAt: orders.createdAt,
        customerName : customers.name,
        customerLastName : customers.lastName,
        label: cashRegister.label,
      }).from(orders).orderBy(desc(orders.createdAt))
      .innerJoin(cashRegister, eq(cashRegister.id, orders.cashRegisterId))
      .leftJoin(customers, eq(customers.id, orders.customerId))
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