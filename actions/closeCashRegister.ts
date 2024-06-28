"use server"
import { GeneralResponse } from "@/lib/types"
import { db, cashRegister, history, cashRegistersOpennings, generalBalance } from "@/schema"
import { desc, eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const closeCashRegister = async (cashRegisterId: string, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {

    const cashRegisterFromDb = await db.select().from(cashRegister).where(eq(cashRegister.id, cashRegisterId))
    if (cashRegisterFromDb.length === 0) throw new Error("La caja no existe")

    if (cashRegisterFromDb[0].openedById === null) throw new Error("La caja no está abierta")

    if (cashRegisterFromDb[0].openedById !== userId) throw new Error("La caja no está abierta por el usuario actual")

    await db.update(cashRegistersOpennings).set({
      closedAt: new Date(),
      endAmount: cashRegisterFromDb[0].currentAmount
    }).where(eq(cashRegistersOpennings.id, cashRegisterFromDb[0].currentOpenningId))

    await db.update(cashRegister).set({
      openedById: null,
      currentAmount: 0,
      currentOpenningId: null
    }).where(eq(cashRegister.id, cashRegisterId))

    const generalBalanceFromDb = await db.select().from(generalBalance).limit(1).orderBy(desc(generalBalance.createdAt))

    await db.insert(generalBalance).values({
      incomingAmount: generalBalanceFromDb[0].balance,
      balance: generalBalanceFromDb[0].balance,
      balanceWithDebt: generalBalanceFromDb[0].balanceWithDebt,
      operationType: "close-cash-register",
      detail: "Cerrando caja " + cashRegisterFromDb[0].label,
      isDebt: false,
      userId: userId
    })

    //await db.update(history).set({ actionType: "close-cash-register" }).where(eq(history.userId, userId))
    await db.insert(history).values({
      userId: userId,
      actionType: "close-cash-register",
      products: [],
      orderId: null,
      customerId: null,
      ip: null,
      userAgent: null,
    })

    revalidatePath("/order")
    return {
      data: cashRegisterFromDb[0],
      error: null,
      message: "Caja cerrada correctamente"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al cerrar la caja"
      }
    }
    return {
      data: null,
      error: "Error al cerrar la caja",
      message: "Error al cerrar la caja"
    }
  }
}