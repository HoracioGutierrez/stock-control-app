"use server"
import { GeneralResponse } from "@/lib/types"
import { db, history, products, orders, productOrders, cashRegister as cashRegisterSchema, customers, generalBalance } from "@/schema"
import { desc, eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const saveNewOrder = async (userId: string, data: any, cashRegister: any, total: number, clientId: string, paymentMethod: string): Promise<GeneralResponse> => {
  "use server"

  try {

    const res = await db.transaction(async (tx) => {
      const order = await tx.insert(orders).values({
        userId: userId,
        total: total,
        status: paymentMethod === "debt" ? "pending" : "confirmed",
        customerId: clientId ? clientId : null,
        ip: data.ip,
        userAgent: data.userAgent,
        cashRegisterId: cashRegister.id,
        paymentMethod: paymentMethod,
      }).returning({
        insertedId: orders.id
      })

      if (order.length === 0) {
        tx.rollback()
        throw new Error("Error al crear la orden")
      }

      data.forEach(async (product: any) => {
        const productOrder = await tx.insert(productOrders).values({
          orderId: order[0].insertedId,
          productId: product.id,
          quantity: product.count,
        }).returning({
          insertedId: productOrders.id
        })

        if (productOrder.length === 0) {
          tx.rollback()
          throw new Error("Error al crear la orden")
        }

        const stockDecrease = await tx.update(products).set({ stock: sql`${products.stock} - ${product.count}` }).where(eq(products.id, product.id)).returning({
          updatedId: products.id
        })

        if (stockDecrease.length === 0) {
          tx.rollback()
          throw new Error("Error al decrementar el stock")
        }
      })

      let updatedCashRegister: any;
      if (paymentMethod === "cash") {
        updatedCashRegister = await tx.update(cashRegisterSchema).set({
          currentAmount: sql`${cashRegisterSchema.currentAmount} + ${total}`,
          totalAmount: sql`${cashRegisterSchema.totalAmount} + ${total}`,
        }).where(eq(cashRegisterSchema.openedById, userId)).returning({
          updatedId: cashRegisterSchema.id
        })
      } else {
        updatedCashRegister = await tx.update(cashRegisterSchema).set({
          totalAmount: sql`${cashRegisterSchema.totalAmount} + ${total}`,
        }).where(eq(cashRegisterSchema.openedById, userId)).returning({
          updatedId: cashRegisterSchema.id
        })
      }

      if (paymentMethod === "debt") {
        if (updatedCashRegister.length === 0) {
          tx.rollback()
          throw new Error("Error al incrementar el monto de la caja")
        }
      }

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

      const generalBalanceFromDb = await tx.select().from(generalBalance).limit(1).orderBy(desc(generalBalance.createdAt))

      if (paymentMethod === "debt") {
        await tx.insert(generalBalance).values({
          incomingAmount: `${total}`,
          balance: generalBalanceFromDb[0].balance,
          balanceWithDebt: String(Number(generalBalanceFromDb[0].balanceWithDebt) + total),
          operationType: "save-order-debt",
          detail: "Nueva compra de $" + total + " con deuda/fiado",
          isDebt: true,
          userId: userId
        })
      }

      if (paymentMethod === "credit") {

        await tx.insert(generalBalance).values({
          incomingAmount: `${total}`,
          balance: generalBalanceFromDb[0].balance,
          balanceWithDebt: String(Number(generalBalanceFromDb[0].balanceWithDebt) + total),
          operationType: "save-order-credit",
          detail: "Nueva compra de $" + total + " con crédito",
          isDebt: true,
          userId: userId,
        })
      }

      if (paymentMethod === "debit") {
        await tx.insert(generalBalance).values({
          incomingAmount: `${total}`,
          balance: generalBalanceFromDb[0].balance,
          balanceWithDebt: String(Number(generalBalanceFromDb[0].balanceWithDebt) + total),
          operationType: "save-order-debit",
          detail: "Nueva compra de $" + total + " con débito",
          isDebt: true,
          userId: userId
        })
      }

      if (paymentMethod === "transfer") {
        await tx.insert(generalBalance).values({
          incomingAmount: `${total}`,
          balance: generalBalanceFromDb[0].balance,
          balanceWithDebt: String(Number(generalBalanceFromDb[0].balanceWithDebt) + total),
          operationType: "save-order-transfer",
          detail: "Nueva compra de $" + total + " con transferencia",
          isDebt: true,
          userId: userId
        })
      }

      if (paymentMethod === "mercadopago") {
        await tx.insert(generalBalance).values({
          incomingAmount: `${total}`,
          balance: generalBalanceFromDb[0].balance,
          balanceWithDebt: String(Number(generalBalanceFromDb[0].balanceWithDebt) + total),
          operationType: "save-order-mercadopago",
          detail: "Nueva compra de $" + total + " con mercadopago",
          isDebt: true,
          userId: userId
        })
      }

      if (paymentMethod === "other") {
        await tx.insert(generalBalance).values({
          incomingAmount: `${total}`,
          balance: generalBalanceFromDb[0].balance,
          balanceWithDebt: String(Number(generalBalanceFromDb[0].balanceWithDebt) + total),
          operationType: "save-order-other",
          detail: "Nueva compra de $" + total + " con otro método de pago",
          isDebt: true,
          userId: userId
        })
      }

      if (paymentMethod === "cash") {
        await tx.insert(generalBalance).values({
          incomingAmount: `${total}`,
          balance: String(Number(generalBalanceFromDb[0].balance) + total),
          balanceWithDebt: String(Number(generalBalanceFromDb[0].balanceWithDebt) + total),
          operationType: "save-order-cash",
          detail: "Nueva compra de $" + total + " con efectivo",
          isDebt: false,
          userId: userId
        })
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