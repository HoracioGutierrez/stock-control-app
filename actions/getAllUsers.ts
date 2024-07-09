"use server"
import { GeneralResponse } from "@/lib/types"
import { db, users } from "@/schema"
import { asc, eq } from "drizzle-orm"

export const getAllUsers = async (inactive = false): Promise<GeneralResponse> => {
  "use server"
  try {
    let usersFromDb: any
    if (inactive) {
      usersFromDb = await db.select().from(users).orderBy(asc(users.name))
    } else {
      usersFromDb = await db.select().from(users).where(eq(users.active, true)).orderBy(asc(users.name))
    }

    return {
      data: usersFromDb,
      error: null,
      message: "Usuarios encontrados"
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
      error: "Error al obtener los usuarios",
      message: "Error al obtener los usuarios"
    }
  }
}