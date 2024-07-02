"use server"
import { GeneralResponse } from "@/lib/types"
import { db, cashRegister, history, cashRegistersOpennings, generalBalance } from "@/schema"
import { desc, eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const closeCashRegister = async (cashRegisterId: string, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const res = await db.transaction(async (tx) => {

      const cashRegisterFromDb = await tx.select().from(cashRegister).where(eq(cashRegister.id, cashRegisterId))

      if (cashRegisterFromDb.length === 0) {
        tx.rollback()
        throw new Error("La caja no existe")
      }

      if (cashRegisterFromDb[0].openedById === null) {
        tx.rollback()
        throw new Error("La caja no está abierta")
      }

      if (cashRegisterFromDb[0].openedById !== userId) {
        tx.rollback()
        throw new Error("La caja no está abierta por el usuario actual")
      }

      await tx.update(cashRegistersOpennings).set({
        closedAt: new Date(),
        endAmount: cashRegisterFromDb[0].currentAmount
      }).where(eq(cashRegistersOpennings.id, cashRegisterFromDb[0].currentOpenningId))

      await tx.update(cashRegister).set({
        openedById: null,
        currentAmount: 0,
        currentOpenningId: null
      }).where(eq(cashRegister.id, cashRegisterId))

      const generalBalanceFromDb = await tx.select().from(generalBalance).limit(1).orderBy(desc(generalBalance.createdAt))

      await tx.insert(generalBalance).values({
        incomingAmount: generalBalanceFromDb[0].balance,
        balance: generalBalanceFromDb[0].balance,
        balanceWithDebt: generalBalanceFromDb[0].balanceWithDebt,
        operationType: "close-cash-register",
        detail: "Cerrando caja " + cashRegisterFromDb[0].label,
        isDebt: false,
        userId: userId
      })

      await tx.insert(history).values({
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
    })

    return res
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