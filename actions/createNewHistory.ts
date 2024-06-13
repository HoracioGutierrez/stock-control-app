"use server"

import { GeneralResponse } from "@/lib/types"
import { db, history } from "@/schema"
import { revalidatePath } from "next/cache"

type CreateNewHistoryProps = {
  userId: string
  actionType: string
  products?: any[]
  orderId?: string
  customerId?: string
  ip?: string
  userAgent?: string
}

export const createNewHistory = async ({ userId, actionType, products, orderId, customerId, ip, userAgent }: CreateNewHistoryProps): Promise<GeneralResponse> => {
  "use server"
  try {
    const historyNew = await db.insert(history).values({
      userId: userId,
      actionType: actionType,
      products: products,
      orderId: orderId,
      customerId: customerId,
      ip: ip,
      userAgent: userAgent,
    }).returning({
      insertedId: history.id
    })

    if (historyNew.length === 0) throw new Error("Error al crear el historial")

    revalidatePath("/movements")

    return {
      data: historyNew[0],
      error: null,
      message: "Historial creado correctamente"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al crear el historial"
      }
    }
    return {
      data: null,
      error: "Error al crear el historial",
      message: "Error al crear el historial"
    }
  }
}