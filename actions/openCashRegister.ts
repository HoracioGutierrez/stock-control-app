"use server"
import { GeneralResponse } from "@/lib/types"
import { db, cashRegister, history, cashRegistersOpennings, generalBalance } from "@/schema"
import { asc, desc, eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const openCashRegister = async (cashRegisterId: string, currentAmount: number, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {

    const res = await db.transaction(async (tx) => {

      const cashRegisterFromDb = await tx.select().from(cashRegister).where(eq(cashRegister.id, cashRegisterId))

      if (cashRegisterFromDb.length === 0) {
        tx.rollback()
        throw new Error("La caja no existe")
      }
      
      if (cashRegisterFromDb[0].openedById) {
        tx.rollback()
        throw new Error("La caja ya está abierta")
      }
      
      if (cashRegisterFromDb[0].active === false) {
        tx.rollback()
        throw new Error("La caja está bloqueada/borrada")
      }
      

      const hasCashRegister = await tx.select().from(cashRegister).where(eq(cashRegister.openedById, userId))
      if (hasCashRegister.length > 0) {
        tx.rollback()
        throw new Error("Ya tienes una caja abierta")
      }
      

      const generalBalanceFromDb = await tx.select().from(generalBalance).limit(1).orderBy(desc(generalBalance.createdAt))
      if (generalBalanceFromDb.length === 0) {
        tx.rollback()
        throw new Error("No hay saldo en la base de datos")
      }
      

      const openning = await tx.insert(cashRegistersOpennings).values({
        userId: userId,
        openedAt: new Date(),
        closedAt: null,
        cashRegisterId: cashRegisterId,
        startAmount: generalBalanceFromDb[0].balance,
        endAmount: 0
      }).returning({
        insertedId: cashRegistersOpennings.id
      })

      if (openning.length === 0) {
        tx.rollback()
        throw new Error("Error al crear la caja")
      }
      

      const cashRegisterUpdated = await tx.update(cashRegister).set({
        openedById: userId,
        currentAmount: currentAmount,
        currentOpenningId: openning[0].insertedId
      }).where(eq(cashRegister.id, cashRegisterId)).returning({
        updatedId: cashRegister.id,
        label: cashRegister.label
      })

      if (cashRegisterUpdated.length === 0) {
        tx.rollback()
        throw new Error("Error al actualizar la caja")
      }
      

      await tx.insert(generalBalance).values({
        incomingAmount: generalBalanceFromDb[0].balance,
        balance: generalBalanceFromDb[0].balance,
        balanceWithDebt: generalBalanceFromDb[0].balanceWithDebt,
        operationType: "open-cash-register",
        detail: "Abriendo caja " + cashRegisterUpdated[0].label,
        isDebt: false,
        userId: userId
      })

      await tx.insert(history).values({
        userId: userId,
        actionType: "open-cash-register",
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
        message: "Caja abierta correctamente"
      }

    })

    return res

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al abrir la caja"
      }
    }
    return {
      data: null,
      error: "Error al abrir la caja",
      message: "Error al abrir la caja"
    }
  }
}