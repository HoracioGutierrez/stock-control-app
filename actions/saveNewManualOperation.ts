"use server"

import { GeneralResponse } from "@/lib/types"
import { cashRegister, db, generalBalance, history, products } from "@/schema"
import { desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const saveNewManualOperation = async (userId: string, amount: number, reason: string, operationType: string): Promise<GeneralResponse> => {
  "use server"
  try {

    const generalBalanceFromDb = await db.select().from(generalBalance).limit(1).orderBy(desc(generalBalance.createdAt))

    if (generalBalanceFromDb.length === 0) throw new Error("No hay saldo en la base de datos")

    const cashRegisterFromDb = await db.select().from(cashRegister).where(eq(cashRegister.openedById, userId))

    if (cashRegisterFromDb.length > 0) {
      if (operationType === "ingreso") {
        await db.update(cashRegister).set({
          currentAmount: Number(cashRegisterFromDb[0].currentAmount) + amount,
          totalAmount: Number(cashRegisterFromDb[0].totalAmount) + amount
        })
      } else {
        await db.update(cashRegister).set({
          currentAmount: Number(cashRegisterFromDb[0].currentAmount) - amount,
          totalAmount: Number(cashRegisterFromDb[0].totalAmount) - amount
        })

      }
    }

    if (operationType === "ingreso") {
      await db.insert(generalBalance).values({
        incomingAmount: `${amount}`,
        balance: String(Number(generalBalanceFromDb[0].balance) + amount),
        balanceWithDebt: String(Number(generalBalanceFromDb[0].balanceWithDebt) + amount),
        operationType: "save-manual-income",
        detail: reason,
        isDebt: false,
        userId: userId
      })
    } else {
      await db.insert(generalBalance).values({
        incomingAmount: `${amount}`,
        balance: String(Number(generalBalanceFromDb[0].balance) - amount),
        balanceWithDebt: String(Number(generalBalanceFromDb[0].balanceWithDebt) - amount),
        operationType: "save-manual-expense",
        detail: reason,
        isDebt: false,
        userId: userId
      })
    }

    await db.insert(history).values({
      userId: userId,
      actionType: operationType === "ingreso" ? "save-manual-income" : "save-manual-expense",
      products: [],
      orderId: null,
      customerId: null,
      ip: null,
      userAgent: null,
    })

    revalidatePath("/order")

    return {
      data: null,
      error: null,
      message: "Operación guardada correctamente"
    }

  } catch (error) {

    return {
      data: null,
      error: "Error al guardar la operación",
      message: "Error al guardar la operación"
    }

  }
}