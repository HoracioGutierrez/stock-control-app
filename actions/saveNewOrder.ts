"use server"
import { GeneralResponse } from "@/lib/types"
import { db, history, products, orders, productOrders, cashRegister as cashRegisterSchema, customers } from "@/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const saveNewOrder = async (userId: string, data: any, cashRegister: any, total: number, clientId: string, paymentMethod: string): Promise<GeneralResponse> => {
  "use server"

  try {

    const res = await db.transaction(async (tx) => {
      //Create Order
      const order = await tx.insert(orders).values({
        userId: userId,
        total: total,
        status: "pending",
        customerId: clientId ? clientId : null,
        ip: data.ip,
        userAgent: data.userAgent,
        cashRegisterId: cashRegister.id,
        paymentMethod: paymentMethod
      }).returning({
        insertedId: orders.id
      })

      //Check if order was created
      if (order.length === 0) {
        tx.rollback()
        throw new Error("Error al crear la orden")
      }

      //Create Product Orders for each product in the order
      data.forEach(async (product: any) => {
        const productOrder = await tx.insert(productOrders).values({
          orderId: order[0].insertedId,
          productId: product.id,
          quantity: product.count,
        }).returning({
          insertedId: productOrders.id
        })

        //Check if product order was created
        if (productOrder.length === 0) {
          tx.rollback()
          throw new Error("Error al crear la orden")
        }

        //Decrease stock of the product
        const stockDecrease = await tx.update(products).set({ stock: sql`${products.stock} - ${product.count}` }).where(eq(products.id, product.id)).returning({
          updatedId: products.id
        })

        //Check if stock was decremented
        if (stockDecrease.length === 0) {
          tx.rollback()
          throw new Error("Error al decrementar el stock")
        }
      })


      //Increase amount of cash register
      const updatedCashRegister = await tx.update(cashRegisterSchema).set({
        currentAmount: sql`${cashRegisterSchema.currentAmount} + ${total}`,
      }).where(eq(cashRegisterSchema.openedById, userId)).returning({
        updatedId: cashRegisterSchema.id
      })

      //Check if cash register was updated
      if (updatedCashRegister.length === 0) {
        tx.rollback()
        throw new Error("Error al incrementar el monto de la caja")
      }

      //check if clientID exists and update the spentAmount
      if (clientId) {
        const customerId = clientId

        const customerFromDB = await tx.select().from(customers).where(eq(customers.id, customerId))
        if (customerFromDB.length === 0) throw new Error("El cliente no existe")

        await tx.update(customers).set({ spentAmount: sql`${customers.spentAmount} + ${total}` }).where(eq(customers.id, customerId)).returning({
          updatedId: customers.id
        })


        if (paymentMethod === "debt") {
          await tx.update(customers).set({
            currentAmount: sql`${customers.currentAmount} - ${total}`
          }).where(eq(customers.id, customerId)).returning({
            updatedId: customers.id
          })
        }
      }

      await tx.insert(history).values({
        userId: userId,
        actionType: "save-order",
        products: [],
        orderId: order[0].insertedId,
        customerId: data.customerId,
        ip: data.ip,
        userAgent: data.userAgent,
      })

      revalidatePath("/order")

      return {
        data: order[0],
        error: null,
        message: "Orden creada correctamente"
      }
    })

    return res

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