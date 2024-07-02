"use server"
import { GeneralResponse } from "@/lib/types"
import { db, users } from "@/schema"
import { eq, or } from "drizzle-orm"

export const getUser = async (username: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const usersFromDb = await db.select().from(users).where(or(eq(users.username, username), eq(users.email, username)))
    if (usersFromDb.length === 0) throw new Error("User not found")
    return {
      data: usersFromDb[0],
      error: null,
      message: "Usuario encontrado"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: {},
        error: error.message,
        message: error.message
      }
    }

    return {
      data: {},
      error: "Error al obtener el usuario",
      message: "Error al obtener el usuario"
    }
  }
}