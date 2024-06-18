"use server"

import { GeneralResponse } from "@/lib/types"
import { entitiesPropsById } from "@/lib/queryConfig"
import { Entity } from "@/lib/types"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/schema"


export const editById = async (entityType: string, entityId: string, data: any): Promise<GeneralResponse> => {
    "use server"
    try {
        const entitySchema = entitiesPropsById[entityType as keyof Entity]
        const idResolve = entityType === "product" ? "barcode" : "id"
        const updatedEntity = await db.update(entitySchema).set(data).where(eq(entitySchema[idResolve], entityId)).returning({
            insertedId: entitySchema.id
        })
        if (updatedEntity.length === 0) throw new Error(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} no encontrado`)

        return {
            data: updatedEntity[0],
            error: null,
            message: `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} editado correctamente`
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                data: null,
                error: error.message,
                message: `Error al editar el ${entityType}`
            }
        }
        return {
            data: null,
            error: `Error al editar el ${entityType}`,
            message: `Error al editar el ${entityType}`
        }
    }
}
