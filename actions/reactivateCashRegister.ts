"use server"
import { GeneralResponse } from "@/lib/types"
import { db, cashRegister, history } from "@/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const reactivateCashRegister = async (cashRegisterId: string, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {

    const res = await db.transaction(async (tx) => {

      const cashRegisterFromDb = await tx.select().from(cashRegister).where(eq(cashRegister.id, cashRegisterId))
      if (cashRegisterFromDb.length === 0) {
        tx.rollback()
        throw new Error("La caja no existe")
      }

      if (cashRegisterFromDb[0].active) {
        tx.rollback()
        throw new Error("La caja ya está activa")
      }
      
      if (cashRegisterFromDb[0].openedById !== null) {
        tx.rollback()
        throw new Error("La caja está abierta")
      }

      await tx.update(cashRegister).set({ active: true }).where(eq(cashRegister.id, cashRegisterId))

      await tx.insert(history).values({
        userId: userId,
        actionType: "reactivate-cash-register",
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
        message: "Caja reactivada correctamente"
      }

    })

    return res
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al reactivar la caja"
      }
    }
    return {
      data: null,
      error: "Error al reactivar la caja",
      message: "Error al reactivar la caja"
    }
  }
}