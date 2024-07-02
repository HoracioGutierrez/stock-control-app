"use server"
import { entitiesPropsById, entityName } from "@/lib/queryConfig"
import { DeleteByIdProps, Entity, EntityName } from "@/lib/types"
import { GeneralResponse } from "@/lib/types"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { db, products } from "@/schema"


export const deleteById = async ({ entityType, entityId, userId }: DeleteByIdProps): Promise<GeneralResponse> => {
  "use server"
  const entityNameResolve = entityName[entityType as keyof EntityName]
  try {

    const res = await db.transaction(async (tx) => {

      const entitySchema = entitiesPropsById[entityType as keyof Entity]
      const entityHistory = entitiesPropsById["history"]
      const data = await tx.select().from(entitySchema).where(eq(entitySchema.id, entityId))

      if (data.length === 0) {
        tx.rollback()
        throw new Error(`No se encontró el ${entityNameResolve} con el id ${entityId}`)
      }

      await tx.update(entitySchema).set({ active: false }).where(eq(entitySchema.id, entityId))

      await tx.insert(entityHistory).values({
        userId: userId,
        actionType: `${entityNameResolve} eliminado`,
        products: [data[0].lastName ? data[0].lastName + " " + data[0].name : ""],
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

    })

    return res
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