"use server"
import { GeneralResponse } from "@/lib/types"
import { db, cashRegister, users } from "@/schema"
import { eq } from "drizzle-orm"

export const getCashRegisterByUserId = async (userId: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const cashRegistersFromDb = await db.select().from(cashRegister).where(eq(cashRegister.openedById, userId))
    const getUser = await db.select().from(users).where(eq(users.id, userId))

    if (cashRegistersFromDb.length === 0) throw new Error("El usuario no tiene cajas abiertas")

    return {
      data: {
        ...cashRegistersFromDb[0],
        openedById: getUser[0].username
      },
      error: null,
      message: "Cajas encontradas"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: error.message
      }
    }

    return {
      data: null,
      error: "Error al obtener las cajas",
      message: "Error al obtener las cajas"
    }
  }
}