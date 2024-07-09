"use server"
import { GeneralResponse } from "@/lib/types"
import { db, generalBalance } from "@/schema"
import { desc, eq } from "drizzle-orm"

export const getGeneralBalance = async (): Promise<GeneralResponse> => {
  "use server"
  try {
    const generalBalancesFromDb = await db.select().from(generalBalance).orderBy(desc(generalBalance.createdAt))
    if (generalBalancesFromDb.length === 0) throw new Error("No se encontró el balance general")
    return {
      data: generalBalancesFromDb,
      error: null,
      message: "Balance general encontrado"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: [],
        error: error.message,
        message: error.message
      }
    }
    return {
      data: [],
      error: "Error al obtener el balance general",
      message: "Error al obtener el balance general"
    }
  }
}