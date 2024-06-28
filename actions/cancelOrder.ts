"use server"
import { GeneralResponse } from "@/lib/types"
import { db, history, orders, cashRegister, productOrders, products, users, customers, generalBalance } from "@/schema"
import { desc, eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const cancelOrder = async (orderId: string, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {

    //Buscar la orden
    const orderFromDB = await db.select().from(orders).where(eq(orders.id, orderId))

    //Si no existe la orden tiro un error
    if (orderFromDB.length === 0) throw new Error("La orden no existe")

    if (orderFromDB[0].status === "canceled") throw new Error("La orden ya fue cancelada")

    //Actualizar el estado de la orden 
    await db.update(orders).set({ status: "canceled" }).where(eq(orders.id, orderId))

    //Incrementar el stock de los productos de la orden
    const orderProducts = await db.select().from(productOrders).where(eq(productOrders.orderId, orderId))

    orderProducts.forEach(async (product: any) => {

      //Revisar si el producto existe
      const productFromDB = await db.select().from(products).where(eq(products.id, product.productId))

      //Si no existe el producto tiro un error
      if (productFromDB.length === 0) throw new Error("El producto no existe")

      //Incrementar el stock del producto
      await db.update(products).set({ stock: sql`${products.stock} + ${product.quantity}` }).where(eq(products.id, product.productId)).returning({
        updatedId: products.id
      })

      //Registrar el incremento del stock en el historial
      await db.insert(history).values({
        userId: userId,
        actionType: "refund-increment-stock",
        products: [productFromDB[0].id],
        orderId: orderId,
        customerId: null,
        ip: null,
        userAgent: null,
      })
    })

    //Buscar el usuario 
    const userFromDB = await db.select().from(users).where(eq(users.id, userId))

    //Si el usuario no existe tiro un error
    if (userFromDB.length === 0) throw new Error("El usuario no existe")

    //Buscar la caja abierta del usuario
    const cashRegisterFromDB = await db.select().from(cashRegister).where(eq(cashRegister.openedById, userId))

    if (cashRegisterFromDB.length === 0 && !userFromDB[0].isAdmin) {
      throw new Error("El usuario no tiene una caja abierta")
    }

    if (cashRegisterFromDB.length > 0) {
      if (orderFromDB[0].paymentMethod !== "debt") {
        await db.update(cashRegister).set({ currentAmount: sql`${cashRegister.currentAmount} - ${orderFromDB[0].total}` }).where(eq(cashRegister.id, cashRegisterFromDB[0].id))
      } else {
        /* await db.update(cashRegister).set({ currentAmount: sql`${cashRegister.currentAmount} + ${orderFromDB[0].total}` }).where(eq(cashRegister.id, cashRegisterFromDB[0].id)) */
      }

      //Registrar el reembolso en el historial
      await db.insert(history).values({
        userId: userId,
        actionType: "refund-cash-register",
        products: [],
        orderId: orderId,
        customerId: null,
        ip: null,
        userAgent: null,
      })
    }

    const customerFromDB = await db.update(customers).set({ spentAmount: sql`${customers.spentAmount} - ${orderFromDB[0].total}` }).where(eq(customers.id, orderFromDB[0].customerId)).returning({
      updatedId: customers.id,
      name: customers.name,
      lastName: customers.lastName,
    })

    const generalBalanceFromDb = await db.select().from(generalBalance).limit(1).orderBy(desc(generalBalance.createdAt))

    //actualizar balance general con el reembolso del cliente descontando el total de la orden al saldo general
    if (customerFromDB && customerFromDB.length > 0) {

      await db.insert(generalBalance).values({
        incomingAmount: orderFromDB[0].total,
        balance: String(Number(generalBalanceFromDb[0].balance) - orderFromDB[0].total),
        balanceWithDebt: String(Number(generalBalanceFromDb[0].balanceWithDebt) - orderFromDB[0].total),
        operationType: "refund-customer",
        detail: "Reembolso de cliente " + customerFromDB[0].name + ", " + customerFromDB[0].lastName + " de la caja " + cashRegisterFromDB[0].label,
        isDebt: false,
        userId: userId
      })
    } else {
      await db.insert(generalBalance).values({
        incomingAmount: orderFromDB[0].total,
        balance: String(Number(generalBalanceFromDb[0].balance) - orderFromDB[0].total),
        balanceWithDebt: String(Number(generalBalanceFromDb[0].balanceWithDebt) - orderFromDB[0].total),
        operationType: "refund-customer",
        detail: "Reembolso de cliente desconocido de la caja " + cashRegisterFromDB[0].label,
        isDebt: false,
        userId: userId
      })
    }

    await db.insert(history).values({
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