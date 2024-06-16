"use server"
import { GeneralResponse } from "@/lib/types"
import { db, cashRegister, history } from "@/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const closeCashRegister = async (cashRegisterId: string, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const cashRegisterFromDb = await db.select().from(cashRegister).where(eq(cashRegister.id, cashRegisterId))
    if (cashRegisterFromDb.length === 0) throw new Error("La caja no existe")

    if (cashRegisterFromDb[0].openedById === null) throw new Error("La caja no está abierta")

    if (cashRegisterFromDb[0].openedById !== userId) throw new Error("La caja no está abierta por el usuario actual")

    await db.update(cashRegister).set({ openedById: null }).where(eq(cashRegister.id, cashRegisterId))

    await db.update(history).set({ actionType: "close-cash-register" }).where(eq(history.userId, userId))

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