"use server"
import { GeneralResponse } from "@/lib/types"
import { db, cashRegister } from "@/schema"

export const getAllCashRegisters = async (): Promise<GeneralResponse> => {
  "use server"
  try {
    const cashRegistersFromDb = await db.select().from(cashRegister).orderBy(cashRegister.label)
    return {
      data: cashRegistersFromDb,
      error: null,
      message: "Cajas encontradas"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al obtener las cajas"
      }
    }
    return {
      data: null,
      error: "Error al obtener las cajas",
      message: "Error al obtener las cajas"
    }
  }
}