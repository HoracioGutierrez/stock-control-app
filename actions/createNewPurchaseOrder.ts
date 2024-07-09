"use server"
import { GeneralResponse } from "@/lib/types"
import { db, history, purchaseOrders, purchaseOrderProducts, cashRegister, users, products as productsSchema, generalBalance, providers } from "@/schema"
import { desc, eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const createNewPurchaseOrder = async (userId: string, products: any[], total: number, providerId: string, incrementStock: boolean): Promise<GeneralResponse> => {
  "use server"
  try {

    const res = await db.transaction(async (tx) => {


      const userFromDB = await tx.select().from(users).where(eq(users.id, userId))

      if (userFromDB.length === 0) {
        tx.rollback()
        throw new Error("El usuario no existe")
      }

      const cashRegisterFromDB = await tx.select().from(cashRegister).where(eq(cashRegister.userId, userId))

      if (cashRegisterFromDB.length > 0) {
        await tx.update(cashRegister).set({
          currentAmount: sql`${cashRegister.currentAmount} - ${total}`,
          totalAmount: sql`${cashRegister.totalAmount} -  ${total}`,
        }).where(eq(cashRegister.openedById, userId))
      } else {
        if (userFromDB[0].isAdmin === false) {
          tx.rollback()
          throw new Error("El usuario no tiene una caja abierta")
        }
      }


      const purchaseOrder = await tx.insert(purchaseOrders).values({
        userId: userId,
        total: total,
        status: "pending",
        cashRegisterId: cashRegisterFromDB ? cashRegisterFromDB[0].id : null,
        providerId: providerId,
      }).returning({
        insertedId: purchaseOrders.id
      })

      if (purchaseOrder.length === 0) {
        tx.rollback()
        throw new Error("Error al crear la orden")
      }

      products.forEach(async (product: any) => {
        const purchaseOrderProduct = await tx.insert(purchaseOrderProducts).values({
          purchaseOrderId: purchaseOrder[0].insertedId,
          productId: product.productId,
          quantity: product.count,
        }).returning({
          insertedId: purchaseOrderProducts.id
        })

        if (incrementStock) {
          const productFromDB = await tx.select().from(productsSchema).where(eq(productsSchema.id, product.productId))
          if (productFromDB.length === 0) {
            tx.rollback()
            throw new Error("El producto no existe")
          }
          await tx.update(productsSchema).set({ stock: sql`${productsSchema.stock} + ${product.count}` }).where(eq(productsSchema.id, product.productId)).returning({
            updatedId: productsSchema.id
          })

          await tx.insert(history).values({
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

      const generalBalanceFromDb = await tx.select().from(generalBalance).limit(1).orderBy(desc(generalBalance.createdAt))
      const providerFromDB = await tx.select().from(providers).where(eq(providers.id, providerId))

      await tx.insert(generalBalance).values({
        incomingAmount: `${total}`,
        balance: String(Number(generalBalanceFromDb[0].balance) - total),
        balanceWithDebt: String(Number(generalBalanceFromDb[0].balanceWithDebt) - total),
        operationType: "save-purchase-order",
        detail: "Nueva compra de " + total + " con efectivo para proveedor " + providerFromDB[0].name + " de la caja " + cashRegisterFromDB ? cashRegisterFromDB[0].label : "Sin caja abierta",
        isDebt: true,
        userId: userId
      })

      await tx.insert(history).values({
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

