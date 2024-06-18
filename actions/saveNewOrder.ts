"use server"
import { GeneralResponse } from "@/lib/types"
import { db, history, products, orders, productOrders, cashRegister as cashRegisterSchema } from "@/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const saveNewOrder = async (userId: string, data: any, cashRegister: any, total: number): Promise<GeneralResponse> => {
  "use server"
  try {

    //Create Order
    const order = await db.insert(orders).values({
      userId: userId,
      total: total,
      status: "pending",
      customerId: data.customerId,
      ip: data.ip,
      userAgent: data.userAgent,
    }).returning({
      insertedId: orders.id
    })

    console.log("uno")

    //Check if order was created
    if (order.length === 0) throw new Error("Error al crear la orden")

    console.log("dos")

    //Create Product Orders for each product in the order
    data.forEach(async (product: any) => {
      const productOrder = await db.insert(productOrders).values({
        orderId: order[0].insertedId,
        productId: product.id,
        quantity: product.count,
      }).returning({
        insertedId: productOrders.id
      })

      //Check if product order was created
      if (productOrder.length === 0) throw new Error("Error al crear la orden")

      //Decrease stock of the product
      const stockDecrease = await db.update(products).set({ stock: sql`${products.stock} - ${product.count}` }).where(eq(products.id, product.id)).returning({
        updatedId: products.id
      })

      //Check if stock was decremented
      if (stockDecrease.length === 0) throw new Error("Error al decrementar el stock")
    })

    console.log("tres")

    //Increase amount of cash register
    const updatedCashRegister = await db.update(cashRegisterSchema).set({
      currentAmount: sql`${cashRegisterSchema.currentAmount} + ${total}`,
    }).where(eq(cashRegisterSchema.openedById, userId)).returning({
      updatedId: cashRegisterSchema.id
    })

    //Check if cash register was updated
    if (updatedCashRegister.length === 0) throw new Error("Error al incrementar el monto de la caja")

    await db.insert(history).values({
      userId: userId,
      actionType: "save-order",
      products: [],
      orderId: order[0].insertedId,
      customerId: data.customerId,
      ip: data.ip,
      userAgent: data.userAgent,
    })

    return {
      data: order[0],
      error: null,
      message: "Orden creada correctamente"
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al crear la orden"
      }
    }

    return {
      data: null,
      error: "Error al crear la orden",
      message: "Error al crear la orden"
    }
  }
}