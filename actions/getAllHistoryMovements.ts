import { GeneralResponse } from "@/lib/types";
import { db, history } from "@/schema";
import { asc, desc, eq } from "drizzle-orm";

export const getAllHistoryMovements = async (userId: string): Promise<GeneralResponse> => {
  try {
    const movements = await db.select().from(history).where(eq(history.userId, userId)).orderBy(desc(history.createdAt))
    if (movements.length === 0) throw new Error("History no encontrado")
    return {
      data: movements,
      error: null,
      message: "History encontrado"
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
      error: "Error al obtener el historial",
      message: "Error al obtener el historial"
    }
  }
}