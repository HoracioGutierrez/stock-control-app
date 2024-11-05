"use server"
import { GeneralResponse } from "@/lib/types"
import { db, history, orders, cashRegister, productOrders, products, users, customers, generalBalance } from "@/schema"
import { desc, eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const cancelOrder = async (orderId: string, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {

    const res = await db.transaction(async (tx) => {


      const orderFromDB = await tx.select().from(orders).where(eq(orders.id, orderId))

      if (orderFromDB.length === 0) {
        tx.rollback()
        throw new Error("La orden no existe")
      }

      if (orderFromDB[0].status === "canceled") {
        tx.rollback()
        throw new Error("La orden ya fue cancelada")
      }

      await tx.update(orders).set({ status: "canceled" }).where(eq(orders.id, orderId))

      const orderProducts = await tx.select().from(productOrders).where(eq(productOrders.orderId, orderId))

      orderProducts.forEach(async (product: any) => {

        const productFromDB = await tx.select().from(products).where(eq(products.id, product.productId))

        if (productFromDB.length === 0) {
          tx.rollback()
          throw new Error("El producto no existe")
        }

        await tx.update(products).set({ stock: sql`${products.stock} + ${product.quantity}` }).where(eq(products.id, product.productId)).returning({
          updatedId: products.id
        })

        await tx.insert(history).values({
          userId: userId,
          actionType: "refund-increment-stock",
          products: [productFromDB[0].id],
          orderId: orderId,
          customerId: null,
          ip: null,
          userAgent: null,
        })
      })

      const userFromDB = await tx.select().from(users).where(eq(users.id, userId))

      if (userFromDB.length === 0) {
        tx.rollback()
        throw new Error("El usuario no existe")
      }

      const cashRegisterFromDB = await tx.select().from(cashRegister).where(eq(cashRegister.openedById, userId))

      if (cashRegisterFromDB.length === 0 && !userFromDB[0].isAdmin) {
        tx.rollback()
        throw new Error("El usuario no tiene una caja abierta")
      }

      if (cashRegisterFromDB.length > 0) {
        if (orderFromDB[0].paymentMethod === "cash") {
          await tx.update(cashRegister).set({
            currentAmount: sql`${cashRegister.currentAmount} - ${orderFromDB[0].total}`,
            totalAmount: sql`${cashRegister.totalAmount} - ${orderFromDB[0].total}`,
          }).where(eq(cashRegister.id, cashRegisterFromDB[0].id))
        } else {
          await tx.update(cashRegister).set({
            totalAmount: sql`${cashRegister.totalAmount} - ${orderFromDB[0].total}`,
          }).where(eq(cashRegister.id, cashRegisterFromDB[0].id))
        }

        await tx.insert(history).values({
          userId: userId,
          actionType: "refund-cash-register",
          products: [],
          orderId: orderId,
          customerId: null,
          ip: null,
          userAgent: null,
        })
      }

      const customerFromDB = await tx.update(customers).set({ spentAmount: sql`${customers.spentAmount} - ${orderFromDB[0].total}` }).where(eq(customers.id, orderFromDB[0].customerId)).returning({
        updatedId: customers.id,
        name: customers.name,
        lastName: customers.lastName,
      })

      const generalBalanceFromDb = await tx.select().from(generalBalance).limit(1).orderBy(desc(generalBalance.createdAt))

      if (customerFromDB && customerFromDB.length > 0) {

        await tx.insert(generalBalance).values({
          incomingAmount: orderFromDB[0].total,
          balance: String(Number(generalBalanceFromDb[0].balance) - orderFromDB[0].total),
          balanceWithDebt: String(Number(generalBalanceFromDb[0].balanceWithDebt) - orderFromDB[0].total),
          operationType: "refund-customer",
          detail: "Reembolso de cliente " + customerFromDB[0].name + ", " + customerFromDB[0].lastName + " de la caja " + cashRegisterFromDB[0].label,
          isDebt: false,
          userId: userId
        })
      } else {
        await tx.insert(generalBalance).values({
          incomingAmount: orderFromDB[0].total,
          balance: String(Number(generalBalanceFromDb[0].balance) - orderFromDB[0].total),
          balanceWithDebt: String(Number(generalBalanceFromDb[0].balanceWithDebt) - orderFromDB[0].total),
          operationType: "refund-customer",
          detail: "Reembolso de cliente desconocido de la caja " + cashRegisterFromDB[0].label,
          isDebt: false,
          userId: userId
        })
      }

      await tx.insert(history).values({
        userId: userId,
        actionType: "refund-customer",
        products: [],
        orderId: orderId,
        customerId: orderFromDB[0].customerId,
        ip: null,
        userAgent: null,
      })

      revalidatePath("/sales")

      return {
        data: null,
        error: null,
        message: "Orden cancelada correctamente"
      }

    })

    return res

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al cancelar la orden"
      }
    }
    return {
      data: null,
      error: "Error al cancelar la orden",
      message: "Error al cancelar la orden"
    }
  }
}