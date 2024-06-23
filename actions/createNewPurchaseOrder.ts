"use server"
import { GeneralResponse } from "@/lib/types"
import { db, history, purchaseOrders, purchaseOrderProducts, cashRegister, users, products as productsSchema } from "@/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const createNewPurchaseOrder = async (userId: string, products: any[], total: number, providerId: string, incrementStock: boolean): Promise<GeneralResponse> => {
  "use server"
  try {

    const userFromDB = await db.select().from(users).where(eq(users.id, userId))

    if (userFromDB.length === 0) throw new Error("El usuario no existe")

    const cashRegisterFromDB = await db.select().from(cashRegister).where(eq(cashRegister.userId, userId))

    if (userFromDB[0].isAdmin === false) {
      if (cashRegisterFromDB.length === 0) throw new Error("El usuario no tiene una caja abierta")
    }

    const purchaseOrder = await db.insert(purchaseOrders).values({
      userId: userId,
      total: total,
      status: "pending",
      cashRegisterId: cashRegisterFromDB[0].id,
      providerId: providerId,
    }).returning({
      insertedId: purchaseOrders.id
    })

    if (purchaseOrder.length === 0) throw new Error("Error al crear la orden")

    products.forEach(async (product: any) => {
      const purchaseOrderProduct = await db.insert(purchaseOrderProducts).values({
        purchaseOrderId: purchaseOrder[0].insertedId,
        productId: product.productId,
        quantity: product.count,
      }).returning({
        insertedId: purchaseOrderProducts.id
      })

      if (incrementStock) {
        const productFromDB = await db.select().from(productsSchema).where(eq(productsSchema.id, product.productId))
        if (productFromDB.length === 0) throw new Error("El producto no existe")
        await db.update(productsSchema).set({ stock: sql`${productsSchema.stock} + ${product.count}` }).where(eq(productsSchema.id, product.productId)).returning({
          updatedId: productsSchema.id
        })

        await db.insert(history).values({
          userId: userId,
          actionType: "increment-product",
          products: [productFromDB[0].id],
          orderId: purchaseOrder[0].insertedId,
          customerId: null,
          ip: null,
          userAgent: null,
        })
      }
    })

    await db.insert(history).values({
      userId: userId,
      actionType: "create-purchase-order",
      products: [],
      orderId: purchaseOrder[0].insertedId,
      customerId: null,
      ip: null,
      userAgent: null,
    })

    revalidatePath("/providers")
    return {
      data: purchaseOrder[0],
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

