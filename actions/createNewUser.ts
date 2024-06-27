"use server"
import { GeneralResponse } from "@/lib/types"
import { db, history, users } from "@/schema"
import { revalidatePath } from "next/cache"

export const createNewUser = async (data: any, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const userFromDB = await db.insert(users).values({
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
      isAdmin: data.isAdmin,
      active: true
    }).returning({
      insertedId: users.id
    })

    if (userFromDB.length === 0) throw new Error("Error al crear el usuario")

    await db.insert(history).values({
      userId: userId,
      actionType: "Nuevo usuario creado",
      products: [],
      orderId: null,
      customerId: null,
      ip: null,
      userAgent: null,
    })

    revalidatePath("/users")
    return {
      data: userFromDB[0],
      error: null,
      message: "Usuario creado correctamente"
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al crear el usuario"
      }
    }
    return {
      data: null,
      error: "Error al crear el usuario",
      message: "Error al crear el usuario"
    }
  }
}