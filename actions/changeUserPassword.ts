"use server"
import { GeneralResponse } from "@/lib/types"
import { db, history, users } from "@/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const changeUserPassword = async (userId: string, newPassword: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const userFromDB = await db.select().from(users).where(eq(users.id, userId))

    if (userFromDB.length === 0) throw new Error("El usuario no existe")

    await db.update(users).set({ password: newPassword }).where(eq(users.id, userId))

    await db.insert(history).values({
      userId: userId,
      actionType: "Cambio de contraseña",
      products: [],
      orderId: null,
      customerId: null,
      ip: null,
      userAgent: null,
    })

    revalidatePath("/account")
    return {
      data: null,
      error: null,
      message: "Contraseña cambiada correctamente"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al cambiar la contraseña"
      }
    }

    return {
      data: null,
      error: "Error al cambiar la contraseña",
      message: "Error al cambiar la contraseña"
    }
  }
} 