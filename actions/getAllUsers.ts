"use server"
import { GeneralResponse } from "@/lib/types"
import { db, users } from "@/schema"
import { asc, eq } from "drizzle-orm"

export const getAllUsers = async (inactive = false): Promise<GeneralResponse> => {
  "use server"
  try {
    //const usersFromDb = await db.select().from(users).orderBy(asc(users.name))
    let usersFromDb: any
    if (inactive) {
      usersFromDb = await db.select().from(users).orderBy(asc(users.name))
    } else {
      usersFromDb = await db.select().from(users).where(eq(users.active, true)).orderBy(asc(users.name))
    }

    return {
      data: usersFromDb,
      error: null,
      message: "Users found"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error getting users"
      }
    }

    return {
      data: null,
      error: "Error getting users",
      message: "Error getting users"
    }
  }
}