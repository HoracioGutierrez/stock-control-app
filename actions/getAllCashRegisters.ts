"use server"
import { GeneralResponse } from "@/lib/types"
import { db, cashRegister } from "@/schema"
import { eq } from "drizzle-orm"

export const getAllCashRegisters = async (inactive = false): Promise<GeneralResponse> => {
  "use server"
  try {

    let cashRegistersFromDb: any
    if (inactive) {
      cashRegistersFromDb = await db.select().from(cashRegister).orderBy(cashRegister.label)
    } else {
      cashRegistersFromDb = await db.select().from(cashRegister).where(eq(cashRegister.active, true)).orderBy(cashRegister.label)
    }

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