"use server"
import { GeneralResponse } from "@/lib/types"
import { db, cashRegister, history, cashRegistersOpennings } from "@/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const openCashRegister = async (cashRegisterId: string, currentAmount: number, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const cashRegisterFromDb = await db.select().from(cashRegister).where(eq(cashRegister.id, cashRegisterId))
    if (cashRegisterFromDb.length === 0) throw new Error("La caja no existe")

    if (cashRegisterFromDb[0].openedById) throw new Error("La caja ya está abierta")

    const hasCashRegister = await db.select().from(cashRegister).where(eq(cashRegister.openedById, userId))

    if (hasCashRegister.length > 0) throw new Error("Ya tienes una caja abierta")


    const openning = await db.insert(cashRegistersOpennings).values({
      userId: userId,
      openedAt: new Date(),
      closedAt: null,
      cashRegisterId: cashRegisterId,
      startAmount: currentAmount,
      endAmount: 0
    }).returning({
      insertedId: cashRegistersOpennings.id
    })

    if (openning.length === 0) throw new Error("Error al crear la caja")

    await db.update(cashRegister).set({
      openedById: userId,
      currentAmount: currentAmount,
      currentOpenningId: openning[0].insertedId
    }).where(eq(cashRegister.id, cashRegisterId))

    await db.insert(history).values({
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