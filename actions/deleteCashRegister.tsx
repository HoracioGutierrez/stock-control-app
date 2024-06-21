"use server"
import { GeneralResponse } from "@/lib/types"
import { db, cashRegister, history } from "@/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const deleteCashRegister = async (cashRegisterId: string, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const cashRegisterFromDb = await db.select().from(cashRegister).where(eq(cashRegister.id, cashRegisterId))
    if (cashRegisterFromDb.length === 0) throw new Error("La caja no existe")

    if (cashRegisterFromDb[0].openedById !== null) throw new Error("La caja está abierta")

    await db.update(cashRegister).set({ active: false }).where(eq(cashRegister.id, cashRegisterId))

    await db.insert(history).values({
      userId: userId,
      actionType: "delete-cash-register",
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
      message: "Caja eliminada correctamente"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al eliminar la caja"
      }
    }
    return {
      data: null,
      error: "Error al eliminar la caja",
      message: "Error al eliminar la caja"
    }
  }
}