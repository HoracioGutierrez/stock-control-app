"use server"
import { entitiesPropsById, entityName } from "@/lib/queryConfig"
import { DeleteByIdProps, Entity, EntityName } from "@/lib/types"
import { GeneralResponse } from "@/lib/types"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { db } from "@/schema"


export const deleteById = async ({ entityType, entityId, userId }: DeleteByIdProps): Promise<GeneralResponse> => {
  "use server"
  const entityNameResolve = entityName[entityType as keyof EntityName]
  try {
    const entitySchema = entitiesPropsById[entityType as keyof Entity]
    const entityHistory = entitiesPropsById["history"]
    const data = await db.select().from(entitySchema).where(eq(entitySchema.id, entityId))
    if (data.length === 0) throw new Error(`No se encontró el ${entityNameResolve} con el id ${entityId}`)
    await db.update(entitySchema).set({ active: false }).where(eq(entitySchema.id, entityId))

    await db.insert(entityHistory).values({
      userId: userId,
      actionType: `delete-${entityType}`,
      products: [data[0].id],
      orderId: null,
      customerId: null,
      ip: null,
      userAgent: null,
    })

    revalidatePath(`/${entityType}s`)
    return {
      data: data[0],
      error: null,
      message: `${entityNameResolve} eliminado correctamente`
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: `Error al eliminar el ${entityNameResolve}`
      }
    }

    return {
      data: null,
      error: `Error al eliminar el ${entityNameResolve}`,
      message: `Error al eliminar el ${entityNameResolve}`
    }
  }
}