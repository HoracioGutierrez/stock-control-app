"use server"
import { GeneralResponse } from "@/lib/types"
import { db, history, users } from "@/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const changeUserPassword = async (userId: string, newPassword: string): Promise<GeneralResponse> => {
  "use server"
  try {

    const res = await db.transaction(async (tx) => {
      const userFromDB = await tx.select().from(users).where(eq(users.id, userId))

      if (userFromDB.length === 0) {
        tx.rollback()
        throw new Error("El usuario no existe")
      }

      await tx.update(users).set({ password: newPassword }).where(eq(users.id, userId))

      await tx.insert(history).values({
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

    })

    return res
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