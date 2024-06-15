"use server"
import { GeneralResponse } from "@/lib/types"
import { db, cashRegister, history } from "@/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const openCashRegister = async (cashRegisterId: string, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const cashRegisterFromDb = await db.select().from(cashRegister).where(eq(cashRegister.id, cashRegisterId))
    if (cashRegisterFromDb.length === 0) throw new Error("La caja no existe")

    if (cashRegisterFromDb[0].openedById) throw new Error("La caja ya está abierta")

    await db.update(cashRegister).set({ openedById: userId }).where(eq(cashRegister.id, cashRegisterId))

    await db.update(history).set({ actionType: "open-cash-register" }).where(eq(history.userId, userId))

    revalidatePath("/order")
    return {
      data: cashRegisterFromDb[0],
      error: null,
      message: "Caja abierta correctamente"
    }
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