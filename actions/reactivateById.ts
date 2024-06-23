"use server"
import { entitiesPropsById, entityName } from "@/lib/queryConfig"
import { Entity, EntityName, GeneralResponse, ReactivateByIdProps } from "@/lib/types"
import { db } from "@/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const reactivateById = async ({ entityType, entityId, userId }: ReactivateByIdProps): Promise<GeneralResponse> => {
  "use server"
  const entityNameResolve = entityName[entityType as keyof EntityName]
  try {
    const entitySchema = entitiesPropsById[entityType as keyof Entity]
    const entityHistory = entitiesPropsById["history"]
    const response = await db.select().from(entitySchema).where(eq(entitySchema.id, entityId))
    if (response.length === 0) throw new Error(`${entityNameResolve} no encontrado`)
    await db.update(entitySchema).set({ active: true }).where(eq(entitySchema.id, entityId))

    await db.insert(entityHistory).values({
      userId: userId,
      actionType: `${entityNameResolve} reactivado`,
      products: [response[0].lastName ? response[0].lastName + " " + response[0].name : ""],
      orderId: null,
      customerId: null,
      ip: null,
      userAgent: null,
    })

    revalidatePath(`/${entityType}s`)
    return {
      data: response[0],
      error: null,
      message: `${entityNameResolve} actualizado correctamente`
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: `Error al reactivar el ${entityNameResolve}`
      }
    } else {
      return {
        data: null,
        error: `Error al reactivar el ${entityNameResolve}`,
        message: `Error al reactivar el ${entityNameResolve}`
      }
    }

  }
}